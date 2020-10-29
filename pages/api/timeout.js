import { createResponse } from '../../server/helpers';

export default function handler(req, res) {
    const response = createResponse(res);

    setTimeout(function () {
        response(['ok'], 200);
    }, 1000);
}
