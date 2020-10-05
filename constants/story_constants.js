const plots = {
  text: "",
  type: "options",
  options: [
    {
      id: 4,
      text: "Era uma vez um chiclete de cereja.",
      type: "options",
      options: [
        {
          id: 1,
          text: "Ele queria ser atleta.",
          text2: "Um dia após ser mascado foi atirado ao chão. Após andar de um lado para o outro",
          type: "options",
          options: [
            {
              id: 1,
              text: "ficou preso numa sapatilha.",
              endline:
                "A sapatilha era de um atleta profissional que estava em corrida. O chiclete de cereja agarrou-se com tudo a essa sapatilha e foi o primeiro chiclete da história a ganhar os jogos olímpicos. Sê como o chiclete de cereja, nunca desistas dos teus sonhos.",
            },
            { id: 2, text: "acabou na lixeira." },
            { id: 3, text: "foi comido por um cão." },
          ],
        },
        { id: 2, text: "Ele era o chiclete mais bonito da caixa." },
        { id: 3, text: "Ele era um chiclete solitário" },
      ],
    },
    { id: 1, text: "Era uma vez uma peúga que não tinha par." },
    { id: 3, text: "Era uma vez um pai natal que perdeu a barba." },
  ],
};

const STEP_TYPE = {
  OPTIONS: "options",
  INPUT: "input",
};
export { plots, STEP_TYPE };
