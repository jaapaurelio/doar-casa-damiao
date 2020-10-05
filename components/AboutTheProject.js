import styles from "./AboutTheProject.module.css";
import Image from './Image';

export default function AboutTheProject() {
  return (
    <div>
      <div className="pageWidthAlign">
        <h1>Como criamos as histórias?</h1>
        <div>
          As crianças da Casa Damião escolheram as personagens, os locais e as
          descrições. Agora tu escolhes como tudo se liga.
        </div>
      </div>
      <Image src="/images/criancas.jpg" label="Usame, Botengue, Kamira, Lara e Felix."></Image>
      <div className="pageWidthAlign">
        <div className="actionButton">
          <button className="btn-doar">Criar História</button>
        </div>
      </div>
    </div>
  );
}
