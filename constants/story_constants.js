const CHARACTERS = {
  GUM: "chichlete",
  SOCK: "meia",
  ANT: "formiga",
  PILLOW: "almofada",
  SWEATSHIRT: "camisola",
  SQUIREL: "esquilo",
  DAWG: "rafeiro",
  BIRD: "pintassilgo",
  UNDERWEAR: "cuecas",
  CLOTHESLINE: "estendal",
  WASHING_MACHINE: "maquina-lavar",
  DUST: "po",
  ATHLETE: "atleta",
  ASTRONAUT: "astronauta",
  WORLD: "mundo",
};

const gumStory = [
  "Era uma vez uma Chiclete de Cereja que sonhava ser atleta. Todos as outras chicletes da caixa gozavam do seu sonho pois o único propósito de uma chiclete era ser mascada e deitada fora. Elas aceitavam bem esse facto, foram criadas para isso.",
  { src: "/images/icon-placeholder.png" },
  "Mas esta chiclete era diferente, era sonhadora e não se limitava ao que os outros diziam.",
  "A caixa de chicletes onde vivia foi comprada por um jovem dos subúrbios da cidade. Após ser mascada a Chiclete de Cereja foi atirada ao chão. ",
  "Ali no chão da rua via muita gente passar de um lado para o outro com as suas vidas ocupadas e a ser ignorada. Ficou ali meses. Embora um pouco triste não desistia do seu sonho, tinha que arranjar forma de conseguir ser atleta.",
  "Num dia de primavera apareceu por ali um Pintassilgo, depois de um pouco de desconfiança o Pintassilgo aproximou-se da chiclete e tornaram-se amigos. A Chiclete de Cereja acabou por contar-lhe o seu sonho e este teve a ideia que mudaria a vida da chiclete para sempre. Ele ouviu falar de uma maratona que ia acontecer no próximo fim de semana na cidade e podia levar a chiclete no seu bico até lá.",
  { src: "/images/icon-placeholder.png" },
  "Assim aconteceu, chegou ao fim de semana e uma hora antes da maratona o Pintassilgo levou a chiclete para o ponto de partida. Quando os atletas começaram a chegar, a Chiclete de Cereja colou-se a uma sapatilha e fez de tudo para nunca se largar.",
  "Ouviu-se a partida, a chiclete estava entre as sapatilhas da frente. Duas horas depois, com muito esforço para que ficasse sempre colada à sapatilha, a chiclete chegou à meta. Tinha participado numa maratona e tinha escolhido a sapatilha certa pois era a do atleta vendedor.",
  { src: "/images/icon-placeholder.png" },
  "A Chiclete de Cereja estava exausta mas valeu a pena. Mesmo quando ninguém acreditou nela, mesmo após passar meses sozinha no canto da rua, ela tinha acabado de se tornar a primeira chiclete da história a ganhar uma maratona. Ouvindo tal feito, o Pintassilgo foi ter com a chiclete e disse: Tudo o que um sonho precisa é de alguém que o consiga realizar, a força e a persistência nunca decepcionam. Parabéns minha querida chiclete.",
];

const gumFriendsOptions = {
  question: "A chiclete fez um amigo, quem?",
  options: [
    {
      id: 1,
      text: "O Pintassilgo",
      character: CHARACTERS.BIRD,
    },
    {
      id: 2,
      text: "O Cão Rafeiro",
      character: CHARACTERS.DAWG,
    },
    {
      id: 3,
      text: "O Esquilo-vermelho",
      character: CHARACTERS.SQUIREL,
    },
  ],
};

const sockVillainOptions = {
  question: "Esta história tem um vilão. Quem era?",
  options: [
    {
      id: 1,
      text: "A terrível Máquina de Lavar",
      character: CHARACTERS.WASHING_MACHINE,
    },
    {
      id: 2,
      text: "O malvado Pó debaixo da cama",
      character: CHARACTERS.DUST,
    },
    {
      id: 3,
      text: "O perigoso Estendal das Traseira",
      character: CHARACTERS.CLOTHESLINE,
    },
  ],
};

const plots = {
  text: "",
  question: "Era uma vez",
  options: [
    {
      id: 1,
      text: "uma chiclete de cereja",
      character: CHARACTERS.GUM,
      question: "Qual era o sonho da chiclete?",
      options: [
        {
          id: 1,
          text: "Ser atleta.",
          character: CHARACTERS.ATHLETE,
          ...gumFriendsOptions,
        },
        {
          id: 2,
          text: "Dar a volta ao Mundo",
          character: CHARACTERS.WORLD,
          ...gumFriendsOptions,
        },
        {
          id: 3,
          text: "Ser Astronauta",
          character: CHARACTERS.ASTRONAUT,
          ...gumFriendsOptions,
        },
      ],
    },
    {
      id: 2,
      text: "uma peúga exploradora",
      question: "A peúga queria fazer amizade com quem?",
      character: CHARACTERS.SOCK,
      options: [
        {
          id: 1,
          text: "A sra Almofada",
          character: CHARACTERS.PILLOW,
          ...sockVillainOptions,
        },
        {
          id: 1,
          text: "A velha Cueca XXL",
          character: CHARACTERS.UNDERWEAR,
          ...sockVillainOptions,
        },
        {
          id: 1,
          text: "A Camisa Coloridaa",
          character: CHARACTERS.SWEATSHIRT,
          ...sockVillainOptions,
        },
      ],
    },
    {
      id: 3,
      text: "uma formiga corajosa",
      question: "Quem era o seu melhor amigo?",
      character: CHARACTERS.ANT,
      options: [
        {
          id: 1,
          text: "O Elefante",

          question: "A formiga fez algo inacreditável. A quem contou?",
          options: [
            {
              id: 1,
              text: "Irmão mais velho",
            },
            {
              id: 1,
              text: "Mãe",
            },
            {
              id: 1,
              text: "Tio",
            },
          ],
        },
        {
          id: 2,
          text: "A Javali",
        },
        {
          id: 3,
          text: "O Coala",
        },
      ],
    },
  ],
};

const STEP_TYPE = {
  OPTIONS: "options",
  INPUT: "input",
};

export { plots, STEP_TYPE, gumStory };
