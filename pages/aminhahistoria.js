import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as lstorage from "local-storage";
import { plots, STEP_TYPE } from "../constants/story_constants";
import styles from "../styles/MyStoryPage.module.css";
import StoryOptions from "../components/StoryOptions";
import StoryInput from "../components/StoryInput";
import Story from "../components/Story";
import { createStoryLine, getCurrentStoryStep } from "../helpers/story_helpers";

export default function MyStoryPage() {
  const router = useRouter();
  const [currentStory, setCurrentStory] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [storyTitle, setStoryTitle] = useState("");

  useEffect(() => {
    const selectedStoryPlot = lstorage("story");
    const author = lstorage("storyAuthor");
    const title = lstorage("storyTitle");
    setAuthorName(author || "");
    setStoryTitle(title || "");

    setCurrentStory(selectedStoryPlot || []);
  }, []);

  const currentStep = getCurrentStoryStep(currentStory, plots);
  const storyLine = createStoryLine(currentStory, plots);
  const finishedStory = currentStep && currentStep.endline;

  function selectOption(option, i) {
    if (!option.type && !option.endline) {
      return;
    }

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
      <h2>A tua história</h2>
      <Story story={storyLine}></Story>
      {currentStep.type === STEP_TYPE.OPTIONS && (
        <div>
          <StoryOptions
            options={currentStep.options}
            onOptionClick={selectOption}
          ></StoryOptions>
        </div>
      )}
      {currentStep.type === STEP_TYPE.INPUT && (
        <StoryInput step={currentStep} onButtonClick={selectText}></StoryInput>
      )}

      {currentStory.length != 0 && !finishedStory && (
        <div className={styles.editStoryFooter}>
          <div onClick={goPreviousStep}>Anterior</div>
          <div onClick={resetStory}>Reiniciar História</div>
        </div>
      )}

      {finishedStory && (
        <div>
          <h2>Está quase perfeito.</h2>
          <div>
            Para finalizar, dá um título a esta história e partilha o teu nome
            com as crianças da Casa Damião. Temos a certeza que elas vão adorar
            saber quem deu vida às suas ideias. <br />
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
          </div>
          <button onClick={saveAuthorAndTitle}>Finalizar</button>
          <br></br>
          <br></br>
        </div>
      )}
    </div>
  );
}
