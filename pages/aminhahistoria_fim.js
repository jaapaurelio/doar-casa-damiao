import React from 'react';
import GumAthleteBird from '../components/GumAthleteBird';

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
