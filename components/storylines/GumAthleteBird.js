import Head from 'next/head';
import StoryImage from '../StoryImage';
import { CHARACTERS_COLORS, CHARACTERS } from '../../constants/story_constants';

export default function GumAthleteBird() {
    return (
        <div>
            <Head>
                <title>A chiclete Atleta e o pintassilgo</title>
                <meta
                    name="description"
                    property="og:description"
                    content="Era uma vez uma Chiclete de Cereja que sonhava ser atleta. Todos as outras chicletes
                    da caixa gozavam do seu sonho pois o único propósito de uma chiclete era ser mascada
                    e deitada fora. Elas aceitavam bem esse facto, foram criadas para isso."></meta>
                <meta property="og:title" content="Com a sua ajuda, criamos histórias de Natal" />
                <meta property="og:image" content="/images/storylines/chiclete.png" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <p>
                Vocês sabem que o único destino possível de uma chiclete é ser mascada e deitada
                fora.
            </p>
            <p>
                Mas a chiclete número 4325 do lote 231 sabor cereja, também conhecida como
                Valentina, tinha um sonho diferente: ser atleta.
            </p>

            <StoryImage
                image={'/images/characters/chichlete.svg'}
                backgroundColor={CHARACTERS_COLORS[CHARACTERS.GUM]}></StoryImage>

            <p>
                Todos as outras chicletes da caixa gozavam com ela e a chamavam Valentina a
                sonhadora.
            </p>

            <p>
                A caixa de chicletes onde vivia foi comprada por um rapaz que usou a chiclete
                enquanto falava com a miúda que gostava, para se fazer de fixe, atirando depois a
                chiclete ao chão.
            </p>
            <p>
                Ali no chão da rua, a Valentina via muita gente passar de um lado para o outro com
                as suas vidas ocupadas e foi ignorada durante meses. Embora um pouco triste não
                desistia do seu sonho, tinha que arranjar forma de conseguir ser a maior atleta de
                sempre.
            </p>
            <StoryImage
                image="/images/characters/pintassilgo.svg"
                backgroundColor={CHARACTERS_COLORS[CHARACTERS.BIRD]}></StoryImage>

            <p>
                Num dia de primavera apareceu por ali um pintassilgo, e depois de um pouco de
                desconfiança o pintassilgo aproximou-se da chiclete e tornaram-se amigos. A chiclete
                de cereja acabou por contar-lhe o seu sonho e este teve a ideia que mudaria a vida
                da Valentina para sempre. Ele ouviu falar de uma maratona que ia acontecer no
                próximo fim de semana na cidade e podia levar a chiclete no seu bico até lá.
            </p>

            <p>
                Assim aconteceu, chegou ao fim de semana e o pintassilgo levou a chiclete para o
                ponto de partida. Quando os atletas começaram a chegar, a chiclete de cereja
                colou-se a uma sapatilha.
            </p>

            <p>
                Ouviu-se a partida e a chiclete estava entre as sapatilhas da frente. Durante duas
                horas, Valentina fez de tudo para nunca se largar e chegou à meta. Tinha participado
                numa maratona e tinha escolhido a sapatilha certa pois era a do atleta vencedor.
            </p>

            <StoryImage
                image="/images/characters/atleta.svg"
                backgroundColor={CHARACTERS_COLORS[CHARACTERS.ATHLETE]}></StoryImage>

            <p>
                A chiclete Valentina estava exausta, mas conseguiu. Com muito esforço e um amigo,
                ela tornou-se a primeira chiclete da história a ganhar uma maratona.
            </p>
        </div>
    );
}
