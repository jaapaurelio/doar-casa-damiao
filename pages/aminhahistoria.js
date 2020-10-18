import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as lstorage from "local-storage";
import { plots, STEP_TYPE } from "../constants/story_constants";
import styles from "../styles/MyStoryPage.module.css";
import StoryOptions from "../components/StoryOptions";
import StoryResume from "../components/StoryResume";
import { getCurrentStoryStep } from "../helpers/story_helpers";
import { Line } from "rc-progress";

export default function MyStoryPage() {
  const router = useRouter();
  const [currentStory, setCurrentStory] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  useEffect(() => {
    const selectedStoryPlot = lstorage("story");
    const author = lstorage("storyAuthor");
    const email = lstorage("storyEmail");
    setAuthorName(author || "");
    setAuthorEmail(email || "");

    setCurrentStory(selectedStoryPlot || []);
  }, []);

  const currentStep = getCurrentStoryStep(currentStory, plots);
  const finishedStory = currentStep && !currentStep.options;

  function selectOption(option, i) {
    const newStory = [
      ...currentStory,
      { type: STEP_TYPE.OPTIONS, value: option.id },
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

  function saveStory() {
    if (!authorEmail) {
      return;
    }

    lstorage("storyAuthor", authorName || "Anónimo");
    lstorage("storyAuthorEmail", authorEmail);

    router.push("/aminhahistoria_fim");
  }
  const percentage = (currentStory.length * 100) / 3;
  return (
    <div className="pageWidthAlign">
      <div>
        <h2>As tuas personagens</h2>
        <Line percent={percentage} strokeWidth="1" strokeColor="#2f3996" />
        <div className={styles.percentage}>{currentStory.length}/3</div>

        <StoryResume
          selectedStoryPlot={currentStory}
          plots={plots}
        ></StoryResume>
        <br></br>
        <br></br>
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
            <h1>Fizeste uma ótima escolha.</h1>
            <div>
              Como último passo, partilha o teu nome com as crianças da Casa
              Damião, elas vão adorar saber que as suas personagens ganharam
              vida.
            </div>
            <div className={styles.storyDetailsContainer}>
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
                Email: *Obrigatório
                <br />
                <input
                  type="text"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                />
              </div>
            </div>
            <button onClick={saveStory}>Ver história</button>
          </div>
        )}
      </div>
    </div>
  );
}
