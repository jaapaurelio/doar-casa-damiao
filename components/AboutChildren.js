import Image from "./Image";
import styles from "./AboutChildren.module.css";

export default function AboutChildren() {
  return (
    <div>
      <div className="pageWidthAlign">
        <Image
          src="/images/friends.jpg"
          label="Ussumane e Felix conheceram-se na Casa Damião e agora são os melhores amigos."
        ></Image>
        <h2>Quem são as crianças?</h2>
        São crianças dos Países Africanos de Língua Oficial Portuguesa (PALOP),
        que vivem em extrema pobreza, isoladas, em situação de risco de vida e
        sem tratamento no seu país de origem.
        <h2>Porquê ajudar?</h2>
        Porque tal como o Ussumane e o Felix, outras crianças com problemas
        cardíacos procuram uma oportunidade para melhorar a sua condição de
        vida.
        <div className={styles.actionButton}>
          <button className="btn-secondary">Saber mais</button>
        </div>
      </div>
    </div>
  );
}
