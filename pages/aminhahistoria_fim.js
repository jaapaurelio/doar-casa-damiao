import React from 'react';
import GumAthleteBird from '../components/stories/GumAthleteBird';
import Head from 'next/head';

const STORY_MAP = {
    'chichlete,atleta,pintassilgo': GumAthleteBird,
};

const STORY_TITLE = {
    'chichlete,atleta,pintassilgo': 'A chiclete atleta e o Pintassilgo',

    'formiga,javali,lago': 'A Formiga e a Javali',
};

export default function MyStoryEndPage({ story, author }) {
    const StoryComponent = STORY_MAP[story];
    const title = STORY_TITLE[story];
    return (
        <div className="pageWidthAlign">
            <Head>
                <title>A Chiclete Atleta</title>
                <meta
                    name="description"
                    property="og:description"
                    content="Era uma vez uma Chiclete de Cereja que sonhava ser atleta. Todos as outras chicletes
                    da caixa gozavam do seu sonho pois o único propósito de uma chiclete era ser mascada
                    e deitada fora. Elas aceitavam bem esse facto, foram criadas para isso."></meta>
                <meta property="og:title" content="Com a sua ajuda, criamos histórias de Natal" />
                <meta property="og:image" content="/images/characters/chichlete.svg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            {title && <h1>{title}</h1>}
            {author && <div>Autor Casa Damião e {author}.</div>}
            {StoryComponent && <StoryComponent></StoryComponent>}
            <h2>Gostaste da história?</h2>
            <div>Ajuda a casa damião e partilha</div>
            <button>Partilhar</button>

            <h2>Doar</h2>
            <div>
                As crianças da casa damião precisam da tua ajuda neste natal. <a>Saber mais.</a>
            </div>
            <button>Doar</button>
        </div>
    );
}

export async function getServerSideProps({ query }) {
    const story = query.characters || '';
    const author = query.author || 'Anónimo';
    return { props: { story, author } };
}
