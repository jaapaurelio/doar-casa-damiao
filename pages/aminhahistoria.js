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
        const selectedStoryPlot = lstorage('story');
        const author = lstorage('storyAuthor');
        const email = lstorage('storyEmail');
        setAuthorName(author || '');
        setAuthorEmail(email || '');
        console.log('selectedStoryPlot', selectedStoryPlot);
        setCurrentStory(selectedStoryPlot || []);
    }, []);

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
        lstorage('story', newStory);
        setCurrentStory(newStory);
    }

    async function saveStory() {
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

        router.push('/aminhahistoria_fim');
    }
    const percentage = (currentStory.length * 100) / 3;
    return (
        <div>
            {currentStep.options && (
                <StoryOptions
                    currenOption={currentStep}
                    onOptionClick={selectOption}></StoryOptions>
            )}
            <div className="pageWidthAlign">
                <h2>As tuas personagens</h2>
                <Line percent={percentage} strokeWidth="1" strokeColor="#2f3996" />
                <div className={styles.percentage}>
                    {currentStory.length}
                    /3
                </div>

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
