import styles from './StoryResume.module.css';
import StoryOption from '../components/StoryOption';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

export default function StoryResume({ selectedStoryPlot, plots }) {
    const router = useRouter();
    let currentOption = plots;
    const a = [...selectedStoryPlot];

    const onChangeCharacter = useCallback(
        (character) => {
            const characterPos = selectedStoryPlot.indexOf(character);
            if (characterPos >= 0 && characterPos < selectedStoryPlot.length) {
                const nStory = selectedStoryPlot.slice(0, characterPos);
                console.log('nStory', nStory);
                router.push({
                    pathname: '/aminhahistoria',
                    query: {
                        characters: nStory.join(','),
                    },
                });
            }
        },
        [selectedStoryPlot, plots]
    );

    const story = a.reduce((text, selectedOption, i) => {
        const option = currentOption.options.find((option) => option.character === selectedOption);

        text = [
            ...text,
            <div key={i}>
                <StoryOption
                    image={`/images/characters/${option.character}.svg`}
                    text={option.text}
                    readOnly={true}
                    onClick={() => onChangeCharacter(option.character)}></StoryOption>
            </div>,
        ];

        currentOption = option;
        return text;
    }, []);

    return <div className={styles.container}>{story}</div>;
}
