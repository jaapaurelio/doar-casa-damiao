import styles from './Story.module.css';
import { gumStory } from '../constants/story_constants';

export default function Story({ title, author }) {
    return (
        <div className={styles.mainStory}>
            {title != undefined && <h2>{title}</h2>}
            {author != undefined && (
                <div className={styles.author}>
                    Criada pela Casa Damião com ajuda de{' '}
                    <span className={styles.authorName}>{author}</span>
                </div>
            )}

            <div>
                {gumStory.map((line, i) => {
                    if (line.src) {
                        return <img key={i} src={line.src}></img>;
                    }

                    return <p key={i}>{line}</p>;
                })}
            </div>
        </div>
    );
}
