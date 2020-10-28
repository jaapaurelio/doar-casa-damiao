import styles from "./StoryOption.module.css";

export default function StoryOption({ image, text, backgroundColor, textColor, onClick, readOnly }) {
  const readOnlyClass = readOnly ? styles.readOnly : "";

  const background = `radial-gradient(circle at top center, ${backgroundColor}DD, ${backgroundColor}DD 53%, ${backgroundColor} 53%)`;

  return (
    <div onClick={onClick} className={`${styles.option} ${readOnlyClass}`} style={{ background, color: textColor }}>
      <img src={image}></img>
      <div>{text}</div>
    </div>
  );
}
