import styles from "./StoryOption.module.css";

export default function StoryOption({ image, text, onClick, readOnly }) {
  const readOnlyClass = readOnly ? styles.readOnly : "";

  return (
    <div onClick={onClick} className={`${styles.option} ${readOnlyClass}`}>
      <img src={image}></img>
      <div>{text}</div>
    </div>
  );
}
