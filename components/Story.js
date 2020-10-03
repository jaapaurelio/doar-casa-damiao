import styles from "./Story.module.css";

export default function Story({ story, title, author }) {
  return (
    <div className={styles.mainStory}>
      {title != undefined && <h1>{title}</h1>}
      <div>{story}</div>
      {author != undefined && <div className={styles.author}>{author}</div>}
    </div>
  );
}
