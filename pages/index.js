import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const [inputValue, setInputValue] = useState('')
  const colors = ["#000000", "#000000"];
  const h = {
    t: "Era uma vez",
    type: 'o',
    o: [
      { t: "uma peúga que nao tinha par." },
      { t: "uma arvore mágia." },
      { t: "um pai natal que perdeu a barba." },
      {
        t: "um chiclete de cereja.",
        t2: "O seu nome era",
        type: 'i',
        o: {
          t: "",
          type: 'o',
          o: [
            {
              t: "Um dia após ser mascado foi atirado ao chão.",
              t2: " Após andar de um lado para o outro",
              type: 'o',
              o: [
                { t: "ficou preso numa sapatilha.",
                  type: 'e'
                },
                { t: "ficou preso num banco de jardim." },
                { t: "foi comida por um cão." },
              ],
            },
            { t: "Ele era o chiclete mais bonito da caixa." },
            { t: "Ele era um chiclete solitário" },
          ],
        },
      },
    ],
  };

  const [text, setText] = useState("");
  const [op, setOp] = useState(h);

  function selectOption(option, i) {
    if (!option.type) {
      return;
    }
    let t2 = option.t2 || "";

    if(option.type == 'e') {
      t2 = `A sapatilha era de um atleta que participava nos jogos olímpicos. A pastilha ${inputValue} tornou-se a primeira pastilha elástica a ganhar uma corrida de 100 metros.`;

    }
    setText(text + " " + option.t + " " + t2);
    setOp(option);
  }

  function selectText(inputtext, option) {
    if(!inputtext) {
      return;
    }

    setText(text + " " + inputtext + '.');
    setOp(option);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.title}>
          As crianças da Casa Damião escolheram as personagem, os lugares e as
          descrições. Você escolhe como tudo se junta.
        </div>
        <div className={styles.userStory}>
          A aventura da peúga Valentina por Daniel Silva.
        </div>
        <p className={`${styles.intro} ${showAll ? styles.showAll : ""}`}>
          Era uma vez uma peúga que não tinha par. O seu nome era Valentina.{" "}
          <br></br>
          Ela decidiu começar uma aventura em busca da sua cara metade.
          <br></br>
          Procurou na máquina de lavar roupa, no cesto de roupa suja e até nas
          almofadas do sofá. Em lado nenhum Valentina escontrava o seu pé
          direito. <br></br>
          Estava triste mas não desanimou. Ao sair da sala notou uma grande
          árvore de natal que ali havia. Como por magía ali estava o seu
          parceiro, brilhante e elegante como sempre.<br></br>
          Ficou feliz por saber que havia uma boa razão pelo seu desaparecimento
          e por saber que daí a uns dias ele voltaría à sua confortável gaveta.
          <br></br>
        </p>

        {!showAll && (
          <div
            onClick={() => {
              setShowAll(true);
            }}
            className={styles.ler}
          >
            Ler História
          </div>
        )}
        {showAll && (
          <div
            onClick={() => {
              setShowAll(false);
            }}
            className={styles.ler}
          >
            Esconder História
          </div>
        )}
        <hr></hr>

        <div className={styles.info}>
          Esta não é a única versão da história criada pelas nossas crianças.
          Faça a sua versão.
        </div>

        <div className={styles.once}>Era uma vez {text}</div>
        <div>
          {op.type == 'o' &&
            op.o.map((option, i) => {
              return (
                <div
                  onClick={() => selectOption(option, i)}
                  className={styles.option}
                >
                  {option.t}
                </div>
              );
            })}

          {op.type == 'i' && (
            <div>
              <input
                onChange={event => setInputValue(event.target.value)}
                className={styles.inputform}
                placeholder="introduzir nome"
              ></input>
              <button
                className={styles.continuebtn}
                onClick={() => selectText(inputValue, op.o, 0)}
              >
                Continuar
              </button>
            </div>
          )}

        {op.type == 'e' && <div>
            <h2>Bom trabalho. A tua história está pronta e fantástica.</h2>
            <div>Partilha a história com todos os teus amigos.</div>
            <button
                className={styles.continuebtn}
              >
                Partilhar história
              </button>

            <div>Queres aproveitar para ajudar as crianças que deram vida a esta história?</div>
            <button
                className={styles.continuebtn}
              >
                Doar
              </button>


            <div className={styles.knowmore}>Saber mais</div>

        </div>}
        </div>
      </main>
    </div>
  );
}
