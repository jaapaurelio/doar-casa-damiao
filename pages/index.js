import React, { useState } from "react";
import { useRouter } from "next/router";
import * as lstorage from "local-storage";

import styles from "../styles/Home.module.css";
import { plots, STEP_TYPE } from "../constants/story_constants";
import StoryOptions from "../components/StoryOptions";
import AboutChildren from "../components/AboutChildren";

export default function Home() {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);

  const storyBeginning = plots;

  function startHistory(option) {
    lstorage("story", [{ type: STEP_TYPE.OPTIONS, value: option.id }]);
    lstorage("storyAuthor", "");
    lstorage("storyTitle", "");
    router.push("/aminhahistoria");
  }

  function hideStory() {
    setShowAll(false);
    setTimeout(function(){
      window.scrollTo(0, 200);
    }, 200)
  }

  return (
    <div className="pageWidthAlign">
      <main className={styles.main}>
        <div className={styles.mainTitle}>Uma história de Natal</div>
        <div className={styles.mainIntro}>
          As crianças da Casa Damião precisam da tua ajuda para criar histórias de Natal.
        </div>

        <div className={styles.userStory}>
          <div className={styles.userStoryPre}>História em destaque</div>A
          aventura da peúga Valentina.
          <div className={styles.userStoryAfter}> José Silva</div>
        </div>
        <p className={`${styles.intro} ${showAll ? styles.showAll : ""}`}>
          Era uma vez uma peúga que não tinha par. O seu nome era Valentina.{" "}
          <br></br>
          Ela decidiu começar uma aventura em busca da sua cara metade.
          <br></br>
          Procurou na máquina de lavar roupa, no cesto de roupa suja e até nas
          almofadas do sofá. Em lado nenhum Valentina escontrava o seu pé
          direito. <br></br>
          Estava triste mas não desanimou. Ao sair da sala notou uma grande
          árvore de natal que ali havia. Como por magía ali estava o seu
          parceiro, brilhante e elegante como sempre.<br></br>
          Ficou feliz por saber que havia uma boa razão pelo seu desaparecimento
          e por saber que daí a uns dias ele voltaría à sua confortável gaveta.
          <br></br>
        </p>
        {!showAll && (
          <div
            onClick={() => {
              setShowAll(true);
            }}
            className={styles.ler}
          >
            Ler História
          </div>
        )}
         {showAll && (
          <div
            onClick={() => {
              hideStory();
            }}
            className={styles.ler}
          >
            Esconder História
          </div>
        )}


        <div className={styles.mainStatus}>
          132 histórias criadas. 57 doações. 1.134€ angariados.
        </div>

        <div className={styles.once}>Era uma vez</div>
        <div>
          {storyBeginning.type == STEP_TYPE.OPTIONS && (
            <StoryOptions
              options={storyBeginning.options}
              onOptionClick={startHistory}
            ></StoryOptions>
          )}
        </div>
        <div className={styles.section}>
          <AboutChildren></AboutChildren>
        </div>
      </main>
    </div>
  );
}
