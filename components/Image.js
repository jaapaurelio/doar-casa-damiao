import styles from './Image.module.css';

export default function Image({ src /*, label*/ }) {
    return (
        <div>
            <img className={styles.image} src={src}></img>
            {
                //<div className={styles.imageText}>{label}</div>
            }
        </div>
    );
}
