import styles from './StoryOptions.module.css';
import StoryOption from './StoryOption';
import { CHARACTERS_COLORS, CHARACTERS_DARK_WHITELIST } from './../constants/story_constants';

export default function StoryOptions({ currenOption, onOptionClick, showQuestion = true }) {
    return (
        <div>
            <div className="pageWidthAlign">{showQuestion && <h2>{currenOption.question}</h2>}</div>
            <div className={styles.caroussel}>
                {currenOption.options.map((option, i) => {
                    const textColor = CHARACTERS_DARK_WHITELIST.includes(option.character)
                        ? 'white'
                        : 'black';
                    return (
                        <div key={i}>
                            <StoryOption
                                onClick={() => onOptionClick(option, i)}
                                image={`/images/characters/${option.character}.svg`}
                                backgroundColor={CHARACTERS_COLORS[option.character]}
                                textColor={textColor}
                                text={option.text}></StoryOption>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
