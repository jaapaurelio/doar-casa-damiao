import styles from './StoryImage.module.css';

export default function StoryImage({ image, backgroundColor = '#FFFFFF' }) {
    const background = `radial-gradient(circle at top center, ${backgroundColor}DD, ${backgroundColor}DD 53%, ${backgroundColor} 53%)`;

    return (
        <div
            className={styles.container}
            style={{
                background,
            }}>
            <img className={styles.image} src={image}></img>
        </div>
    );
}
