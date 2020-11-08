import React from 'react';
import Link from 'next/link';
import GumAthleteBird from '../components/storylines/GumAthleteBird';
import GumAthleteDawg from '../components/storylines/GumAthleteDawg';
import GumAthleteSquirrel from '../components/storylines/GumAthleteSquirrel';

import GumWorldBird from '../components/storylines/GumWorldBird';
import GumWorldDawg from '../components/storylines/GumWorldDawg';
import GumWorldSquirrel from '../components/storylines/GumWorldSquirrel';

import GumAstronautBird from '../components/storylines/GumAstronautBird';
import GumAstronautDawg from '../components/storylines/GumAstronautDawg';
import GumAstronautSquirrel from '../components/storylines/GumAstronautSquirrel';

import SockUnderwearWashingMachine from '../components/storylines/SockUnderwearWashingMachine';
import SockUnderwearClothesline from '../components/storylines/SockUnderwearClothesline';
import SockUnderwearDust from '../components/storylines/SockUnderwearDust';

import SockSweatshirtWashingMachine from '../components/storylines/SockSweatshirtWashingMachine';
import SockSweatshirtClothesline from '../components/storylines/SockSweatshirtClothesline';
import SockSweatshirtDust from '../components/storylines/SockSweatshirtDust';

import SockPillowWashingMachine from '../components/storylines/SockPillowWashingMachine';
import SockPillowClothesline from '../components/storylines/SockPillowClothesline';
import SockPillowDust from '../components/storylines/SockPillowDust';

import AntUrchinRiver from '../components/storylines/AntUrchinRiver';
import AntUrchinLake from '../components/storylines/AntUrchinLake';
import AntUrchinMountain from '../components/storylines/AntUrchinMountain';

import AntBoarRiver from '../components/storylines/AntBoarRiver';
import AntBoarLake from '../components/storylines/AntBoarLake';
import AntBoarMountain from '../components/storylines/AntBoarMountain';

import AntKoalaRiver from '../components/storylines/AntKoalaRiver';
import AntKoalaLake from '../components/storylines/AntKoalaLake';
import AntKoalaMountain from '../components/storylines/AntKoalaMountain';

import NoStory from '../components/storylines/NoStory';

const STORY_MAP = {
    'chichlete,atleta,pintassilgo': GumAthleteBird,
    'chichlete,atleta,rafeiro': GumAthleteDawg,
    'chichlete,atleta,esquilo': GumAthleteSquirrel,

    'chichlete,mundo,pintassilgo': GumWorldBird,
    'chichlete,mundo,rafeiro': GumWorldDawg,
    'chichlete,mundo,esquilo': GumWorldSquirrel,

    'chichlete,astronauta,pintassilgo': GumAstronautBird,
    'chichlete,astronauta,rafeiro': GumAstronautDawg,
    'chichlete,astronauta,esquilo': GumAstronautSquirrel,

    'meia,cuecas,maquinalavar': SockUnderwearWashingMachine,
    'meia,cuecas,estendal': SockUnderwearClothesline,
    'meia,cuecas,po': SockUnderwearDust,

    'meia,camisola,maquinalavar': SockSweatshirtWashingMachine,
    'meia,camisola,estendal': SockSweatshirtClothesline,
    'meia,camisola,po': SockSweatshirtDust,

    'meia,almofada,maquinalavar': SockPillowWashingMachine,
    'meia,almofada,estendal': SockPillowClothesline,
    'meia,almofada,po': SockPillowDust,

    'formiga,ourico,rio': AntUrchinRiver,
    'formiga,ourico,lago': AntUrchinLake,
    'formiga,ourico,montanha': AntUrchinMountain,

    'formiga,javali,rio': AntBoarRiver,
    'formiga,javali,lago': AntBoarLake,
    'formiga,javali,montanha': AntBoarMountain,

    'formiga,coala,rio': AntKoalaRiver,
    'formiga,coala,lago': AntKoalaLake,
    'formiga,coala,montanha': AntKoalaMountain,
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
            {StoryComponent && (
                <div>
                    {title && <h1>{title}</h1>}

                    {author && <div>Autor Casa Damião e {author}.</div>}

                    <StoryComponent></StoryComponent>

                    <h2>Gostaste da história?</h2>
                    <div>Ajuda a casa damião e partilha</div>
                    <button className="btn-secondary">Partilhar</button>
                </div>
            )}
            {!StoryComponent && <NoStory></NoStory>}

            <h2>Doar</h2>
            <div>
                As crianças da casa damião precisam da tua ajuda neste natal. <a>Saber mais.</a>
            </div>
            <Link href="/doar">
                <button className="btn-primary">Doar</button>
            </Link>
        </div>
    );
}

export async function getServerSideProps({ query }) {
    const story = query.characters || '';
    const author = query.author || 'Anónimo';
    return { props: { story, author } };
}
