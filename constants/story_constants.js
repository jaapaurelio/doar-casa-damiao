const plots = {
  text: "Era uma vez",
  type: "options",
  options: [
    { id: 1, text: "uma peúga que nao tinha par." },
    { id: 2, text: "uma arvore mágica." },
    { id: 3, text: "um pai natal que perdeu a barba." },
    {
      id: 4,
      text: "um chiclete de cereja.",
      type: "input",
      input: {
        text: "O seu nome era",
        type: "options",
        options: [
          {
            id: 1,
            text: "Um dia após ser mascado foi atirado ao chão.",
            text2: " Após andar de um lado para o outro",
            type: "options",
            options: [
              { id: 1, text: "ficou preso numa sapatilha.", endline: 'A sapatilha era de um atleta profissional. O chiclete de cereja foi o primeiro chiclete a ganhar os jogos olímpicos.' },
              { id: 2, text: "ficou preso num banco de jardim." },
              { id: 3, text: "foi comida por um cão." },
            ],
          },
          { id: 2, text: "Ele era o chiclete mais bonito da caixa." },
          { id: 3, text: "Ele era um chiclete solitário" },
        ],
      },
    },
  ],
};

const STEP_TYPE = {
  OPTIONS: 'options',
  INPUT: 'input' 
}
export { plots, STEP_TYPE };
