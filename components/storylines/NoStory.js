import { useRouter } from 'next/router';
import { plots } from '../../constants/story_constants';
import StoryOptions from '../StoryOptions';
import * as lstorage from 'local-storage';

export default function NoStory() {
    const router = useRouter();

    function startHistory(option) {
        lstorage('storyAuthor', '');
        router.push({
            pathname: '/aminhahistoria',
            query: {
                characters: option.character,
            },
        });
    }
    return (
        <div>
            <h2>Não encontramos a história que procuras</h2>
            <p>Mas não há problema, tu podes criar a tua prória história.</p>
            <h1>Era uma vez...</h1>
            <StoryOptions
                showQuestion={false}
                currenOption={plots}
                onOptionClick={startHistory}></StoryOptions>
        </div>
    );
}
