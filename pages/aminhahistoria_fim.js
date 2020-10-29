import { createStoryLine } from '../helpers/story_helpers';
import React, { useState, useEffect } from 'react';
import * as lstorage from 'local-storage';
import { plots } from '../constants/story_constants';
import Story from '../components/Story';

export default function MyStoryEndPage() {
    const [currentStory, setCurrentStory] = useState([]);
    const [authorName, setAuthorName] = useState('');
    const storyTitle = 'A Formiga atleta e o Pintassilgo';

    useEffect(() => {
        const selectedStoryPlot = lstorage('story');
        const author = lstorage('storyAuthor');
        setAuthorName(author || '');

        setCurrentStory(selectedStoryPlot || []);
    }, []);

    const storyLine = createStoryLine(currentStory, plots);

    return (
        <div className="pageWidthAlign">
            <Story story={storyLine} title={storyTitle} author={authorName}></Story>

            <h2>Gostaste da história?</h2>
            <div>Ajuda a casa damião e partilha</div>
            <button>Partilhar</button>

            <h2>Doar</h2>
            <div>
                As crianças da casa damião precisam da tua ajuda neste natal. <a>Saber mais.</a>
            </div>
            <button>Doar</button>
        </div>
    );
}
