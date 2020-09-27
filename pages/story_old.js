import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

  const colors = [
    '#000000',
    '#000000'
  ];
  const h = [
    {t : 'uma criança que vivia em África ', u: 'Jose Carlos'},
    {t : 'e sonhava um dia viajar de avião. ', u: 'Ligia Sousa'},
    {t : 'Sempre que via um avião dizia olá para o céu ', u: 'Carlos Manuel'},
    {t : 'mas ele nunca parava. ', u: 'Hugo Fernandes'},
    {t : 'Um dia essa criança conheceu o sr António ', u: 'António Miguel'},
    {t : 'era um homem que gostava de realizar sonhos. ', u: 'Sara Silva'},
    {t : 'e queria realizar o sonho desta criança. ', u: 'Susana de Jesus Santos'},
    {t : 'Assim decidiu comprar uma viagem para Portugal. ', u: 'Ana'},
    {t : 'Mas a criança viu um problema pois não queria ir sozinha. ', u: 'Aurelio Sousa'},
    {t : 'O que podia ela fazer, tinha apenas 14 anos e nunca tinha saído da sua cidade sozinha. ', u: 'Igor de Silva Pinta'},
    {t : 'Após pensar muito o sr Antonio teve uma ideia. ', u: 'Sara M.'},
    {t : 'Decidiu juntar um grupo de amigos para que podessem ir todos juntos. ', u: 'Carolina Camacho'},

  ]
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Faça parte desta história de Natal.</h1>
        <p className={styles.intro}>
          Era uma vez{' '}
        </p>
        {h.map((m, i) =>{
          let style = {
          }
          if(i % 2 === 0) {
            style.color = colors[0]
          } else {
            style.color = colors[1]
          }
          return <span style={style} className={styles.message}
          ><span className={styles.user}>{m.u}</span>
          {m.t}
          </span>
        })}
        <input className={styles.insertinput} placeholder="Continue aqui a história..."></input>
        <button className={styles.doarbtn}>Gravar</button>
        </main>
    </div>
  )
}
