import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as lstorage from "local-storage";

import styles from "../styles/Home.module.css";
import { plots, STEP_TYPE } from "../constants/story_constants";
import StoryOptions from "../components/StoryOptions";
import Story from "../components/Story";

import AboutChildren from "../components/AboutChildren";
import AboutTheProject from "../components/AboutTheProject";
import AboutCasaDamiao from "../components/AboutCasaDamiao";

export default function Home() {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const mStory = `Era uma vez uma peúga que não tinha par. O seu nome era Valentina. Ela
                decidiu começar uma aventura em busca da sua cara metade. Procurou na
                máquina de lavar roupa, no cesto de roupa suja e até nas almofadas do
                sofá. Em lado nenhum Valentina escontrava o seu pé direito. Estava
                triste mas não desanimou. Ao sair da sala notou uma grande árvore de
                natal que ali havia. Como por magía ali estava o seu parceiro,
                brilhante e elegante como sempre. Ficou feliz por saber que havia uma
                boa razão pelo seu desaparecimento e por saber que daí a uns dias ele
                voltaría à sua confortável gaveta.`;

  const storyBeginning = plots;

  function startHistory(option) {
    lstorage("story", [{ type: STEP_TYPE.OPTIONS, value: option.id }]);
    lstorage("storyAuthor", "");
    router.push("/aminhahistoria");
  }

  function hideStory() {
    setShowAll(false);
  }

  return (
    <div>
      <main className={styles.main}>
        <div className="pageWidthAlign">
          <div className={styles.mainTitle}>Todas as crianças</div>
          <div className={styles.mainTitleSub}>
            merecem uma história de Natal
          </div>
          <div className={styles.splitMessageDonate}>
            <div className={styles.splitMessageMessage}>
              Ao ajudar está a garantir e a acrescentar longevidade e dignidade
              à vida humana.
            </div>
            <Link href="/doar">
              <button className="btn-doar">Doar</button>
            </Link>
          </div>
          <div className={styles.createYourStory}>
            Cria a tua própria história
          </div>
          <div className={styles.createYourStoryBegin}>Era uma vez...</div>
        </div>

        <StoryOptions
          showQuestion={false}
          currenOption={storyBeginning}
          onOptionClick={startHistory}
        ></StoryOptions>
        <div className="pageWidthAlign">
          <div className={styles.mainStatus}>
            132 histórias criadas. 57 doações. 1.134€ angariados.
          </div>
          <div className={styles.center}>
            <Link href="/doar">
              <button className="btn-doar">Fazer Doação</button>
            </Link>
          </div>
          <div className={styles.userStory}>
            <div className={styles.userStoryPre}>História em destaque</div>A
            aventura da peúga Valentina.
            <div className={styles.userStoryAfter}> José Silva</div>
          </div>
          <div className={`${styles.intro} ${showAll ? styles.showAll : ""}`}>
            <Story story={mStory}></Story>
          </div>
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
        </div>
        <div className={styles.section}>
          <AboutChildren></AboutChildren>
        </div>
        <div className={styles.section}>
          <AboutCasaDamiao></AboutCasaDamiao>
        </div>
      </main>
    </div>
  );
}
