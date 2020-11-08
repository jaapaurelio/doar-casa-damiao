import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as lstorage from 'local-storage';
import { plots } from '../constants/story_constants';
import styles from './aminhahistoria.module.css';
import StoryOptions from '../components/StoryOptions';
import StoryResume from '../components/StoryResume';
import { getCurrentStoryStep } from '../helpers/story_helpers';
import { Line } from 'rc-progress';
import axios from 'axios';

export default function MyStoryPage() {
    const router = useRouter();
    const [currentStory, setCurrentStory] = useState([]);
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');

    useEffect(() => {
        const chars = router.query.characters || '';
        const selectedStoryPlot = chars.length > 0 ? chars.split(',') : undefined;
        setCurrentStory(selectedStoryPlot || []);
    }, [router.query.characters]);

    const currentStep = getCurrentStoryStep(currentStory, plots);
    const finishedStory = currentStep && !currentStep.options;

    function selectOption(option) {
        const newStory = [...currentStory, option.character];
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
        router.push({
            pathname: '/aminhahistoria',
            query: {
                characters: newStory.join(','),
            },
        });
    }

    async function saveStory(e) {
        e.preventDefault();
        if (!authorEmail) {
            return;
        }

        lstorage('storyAuthor', authorName);
        lstorage('storyAuthorEmail', authorEmail);

        await axios({
            method: 'POST',
            url: '/api/story',
            data: {
                name: authorName,
                email: authorEmail,
                characters: currentStory,
            },
        }).catch((err) => {
            console.error('saveStory error', err);
        });

        router.push({
            pathname: '/historia',
            query: router.query,
        });
    }
    const percentage = (currentStory.length * 100) / 3;
    return (
        <div>
            <div className="pageWidthAlign">
                <Line percent={percentage} strokeWidth="1" strokeColor="#8acab7" />
                <div className={styles.percentage}>
                    {currentStory.length}
                    /3
                </div>
            </div>
            {currentStep.options && (
                <StoryOptions
                    currenOption={currentStep}
                    onOptionClick={selectOption}></StoryOptions>
            )}
            <div className="pageWidthAlign">
                <h2>As tuas personagens</h2>

                <StoryResume selectedStoryPlot={currentStory} plots={plots}></StoryResume>

                {currentStory.length != 0 && !finishedStory && (
                    <div className={styles.editStoryFooter}>
                        <div onClick={goPreviousStep}>Anterior</div>
                        <div onClick={resetStory}>Reiniciar História</div>
                    </div>
                )}

                {finishedStory && (
                    <div>
                        <h2>Fizeste uma ótima escolha.</h2>
                        <div>
                            Como último passo, partilha o teu nome com as crianças da Casa Damião,
                            elas vão adorar saber que as suas personagens ganharam vida.
                        </div>
                        <form onSubmit={(e) => saveStory(e)}>
                            <div className={styles.storyDetailsContainer}>
                                <div>
                                    Autor:
                                    <input
                                        type="text"
                                        value={authorName}
                                        onChange={(e) => setAuthorName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    Email: *Obrigatório
                                    <input
                                        type="email"
                                        required={true}
                                        value={authorEmail}
                                        onChange={(e) => setAuthorEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className="btn-secondary" type="submit">
                                Ver história
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
