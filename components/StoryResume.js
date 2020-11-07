import styles from './StoryResume.module.css';
import StoryOption from '../components/StoryOption';

export default function StoryResume({ selectedStoryPlot, plots }) {
    let currentOption = plots;
    const a = [...selectedStoryPlot];

    const story = a.reduce((text, selectedOption, i) => {
        const option = currentOption.options.find((option) => option.character === selectedOption);

        text = [
            ...text,
            <div key={i}>
                <StoryOption
                    image={`/images/characters/${option.character}.svg`}
                    text={option.text}
                    readOnly={true}></StoryOption>
            </div>,
        ];

        currentOption = option;
        return text;
    }, []);

    return <div className={styles.container}>{story}</div>;
}
