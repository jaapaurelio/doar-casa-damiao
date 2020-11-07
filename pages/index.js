import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as lstorage from 'local-storage';

import styles from './index.module.css';
import { plots } from '../constants/story_constants';
import StoryOptions from '../components/StoryOptions';

import AboutChildren from '../components/AboutChildren';
import Stats from '../components/Stats';
import Title from '../components/Title';
import AboutCasaDamiao from '../components/AboutCasaDamiao';
import AboutProject from '../components/AboutProject';

export default function Home() {
    const router = useRouter();

    const storyBeginning = plots;

    function startHistory(option) {
        lstorage('storyAuthor', '');
        router.push({
            pathname: '/aminhahistoria',
            query: {
                characters: option.character,
            },
        });
    }

    return (
        <div>
            <main className={styles.main}>
                <div className="pageWidthAlign">
                    <Title
                        mainText="Todas as crianças"
                        subText="merecem uma história de Natal"></Title>

                    <div className={styles.splitMessageDonate}>
                        <div className={styles.splitMessageMessage}>
                            Ao ajudar está a garantir e a acrescentar longevidade e dignidade à vida
                            humana.
                        </div>
                        <Link href="/doar">
                            <button className="btn-primary">Doar</button>
                        </Link>
                    </div>
                    <div className={styles.createYourStory}>Cria a tua própria história</div>
                    <div className={styles.createYourStoryBegin}>Era uma vez...</div>
                </div>

                <StoryOptions
                    showQuestion={false}
                    currenOption={storyBeginning}
                    onOptionClick={startHistory}></StoryOptions>

                <div className="pageWidthAlign">
                    <div className="spacing-section">
                        <AboutProject></AboutProject>
                    </div>
                    <div className="spacing-section">
                        <div className={styles.userStory}>
                            <h2>História em destaque</h2>
                            <div className={styles.storyTitle}>A aventura da peúga Valentina.</div>
                            <div className={styles.userStoryAfter}> José Silva</div>
                        </div>
                        <div className={styles.ler}>Ler História</div>
                        <button className="btn-secondary btn-full">Ver todas as histórias</button>
                    </div>
                    <div className=" spacing-section">
                        <Stats></Stats>
                    </div>
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
