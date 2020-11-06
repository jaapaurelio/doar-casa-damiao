import { create, validate, list } from '../../server/story';
import { createResponse } from '../../server/helpers';

export default (req, res) => {
    const response = createResponse(res);

    if (req.method.toLowerCase() === 'post') {
        const check = validate(req.body);

        if (!check.valid) {
            return response(check.toString(), 400);
        } else {
            const { name, email, characters } = req.body;

            return create(characters.join(';'), email, name)
                .then((story) => response({ ...story, characters: story.characters.split(';') }))
                .catch(() => response('', 500));
        }
    } else if(req.method.toLowerCase() === 'get') {
        return list()
            .then(resp => response(resp))
            .catch(() => response('', 500))
    }

    return response('not found', 404);
};
