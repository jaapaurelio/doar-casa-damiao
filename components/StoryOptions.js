import styles from './StoryOptions.module.css';
import StoryOption from './StoryOption';
import { CHARACTERS_COLORS, CHARACTERS_DARK_WHITELIST } from './../constants/story_constants';
import { useEffect, useRef } from 'react';

export default function StoryOptions({ currenOption, onOptionClick, showQuestion = true }) {
    const carousselRef = useRef();
    const currentCarouselLeftScroll = carousselRef.current ? carousselRef.current.scrollLeft : 0;

    useEffect(() => {
        if (currentCarouselLeftScroll > 0 && carousselRef.current) {
            carousselRef.current.scrollLeft = 0;
        }
    }, [currentCarouselLeftScroll]);

    return (
        <div>
            <div className="pageWidthAlign">{showQuestion && <h2>{currenOption.question}</h2>}</div>
            <div className={styles.caroussel} ref={carousselRef}>
                {currenOption.options.map((option, i) => {
                    const textColor = CHARACTERS_DARK_WHITELIST.includes(option.character)
                        ? 'white'
                        : 'black';
                    return (
                        <StoryOption
                            key={i}
                            onClick={() => onOptionClick(option, i)}
                            image={`/images/characters/${option.character}.svg`}
                            backgroundColor={CHARACTERS_COLORS[option.character]}
                            textColor={textColor}
                            text={option.text}></StoryOption>
                    );
                })}
            </div>
        </div>
    );
}
