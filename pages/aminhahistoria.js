import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as lstorage from "local-storage";
import { plots, STEP_TYPE } from "../constants/story_constants";
import styles from "../styles/MyStoryPage.module.css";
import StoryOptions from "../components/StoryOptions";
import StoryResume from "../components/StoryResume";
import Story from "../components/Story";
import { createStoryLine, getCurrentStoryStep } from "../helpers/story_helpers";

export default function MyStoryPage() {
  const defaultStoryTitle = "A Chiclete de Cereja";
  const router = useRouter();
  const [currentStory, setCurrentStory] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [submitStoryStep, setSubmitStoryStep] = useState(false);
  const [storyTitle, setStoryTitle] = useState(defaultStoryTitle);

  useEffect(() => {
    const selectedStoryPlot = lstorage("story");
    const author = lstorage("storyAuthor");
    const email = lstorage("storyEmail");
    const title = lstorage("storyTitle");
    setAuthorName(author || "Anónimo");
    setAuthorEmail(email || "");
    setStoryTitle(title || defaultStoryTitle);

    setCurrentStory(selectedStoryPlot || []);
  }, []);

  const currentStep = getCurrentStoryStep(currentStory, plots);
  const storyLine = createStoryLine(currentStory, plots);
  const finishedStory = currentStep && !currentStep.options;

  function selectOption(option, i) {
    const newStory = [
      ...currentStory,
      { type: STEP_TYPE.OPTIONS, value: option.id },
    ];

    saveCurrentStory(newStory);
  }

  function selectText(inputValue, option) {
    if (!inputValue) {
      return;
    }
    const newStory = [
      ...currentStory,
      { type: STEP_TYPE.INPUT, value: inputValue + "." },
    ];

    saveCurrentStory(newStory);
  }

  function goPreviousStep() {
    currentStory.pop();
    saveCurrentStory([...currentStory]);
  }

  function resetStory() {
    saveCurrentStory([]);
  }

  function saveCurrentStory(newStory) {
    lstorage("story", newStory);
    setCurrentStory(newStory);
  }

  function saveAuthorAndTitle() {
    if (!authorName || !storyTitle) {
      return;
    }
    lstorage("storyAuthor", authorName);
    lstorage("storyTitle", storyTitle);

    router.push("/aminhahistoria_fim");
  }

  return (
    <div className="pageWidthAlign">
      {!submitStoryStep && (
        <div>
          <h2>Criar história</h2>

          <StoryResume
            selectedStoryPlot={currentStory}
            plots={plots}
          ></StoryResume>

          {currentStep.options && (
            <StoryOptions
              currenOption={currentStep}
              onOptionClick={selectOption}
            ></StoryOptions>
          )}

          {currentStory.length != 0 && !finishedStory && (
            <div className={styles.editStoryFooter}>
              <div onClick={goPreviousStep}>Anterior</div>
              <div onClick={resetStory}>Reiniciar História</div>
            </div>
          )}

          {finishedStory && (
            <div>
              <div>Fizeste uma ótima escolha.</div>
              <button onClick={() => setSubmitStoryStep(true)}>
                Gerar História
              </button>
            </div>
          )}
        </div>
      )}
      {finishedStory && submitStoryStep && (
        <div>
          <h1>A tua história foi gerada.</h1>
          <br />
          <h2>{storyTitle}</h2>
          <Story
            story={storyLine}
            selectedStoryPlot={currentStory}
            plots={plots}
          ></Story>
          <h1>Gostaste?</h1>
          <div>
            Dá um título a esta história e partilha o teu nome com as crianças
            da Casa Damião. Elas vão adorar saber que as suas personagens ganharam vida.
            <br />
          </div>
          <div className={styles.storyDetailsContainer}>
            <div>
              Título da História: <br />
              <input
                type="text"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
              />
            </div>
            <div>
              Autor:
              <br />
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
            <div>
              Email:
              <br />
              <input
                type="text"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
              />
            </div>
          </div>
          <button onClick={saveAuthorAndTitle}>Finalizar</button>
        </div>
      )}
    </div>
  );
}
