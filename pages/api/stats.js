import { createResponse } from '../../server/helpers';
import { get } from '../../server/stats';

export default (req, res) => {
    const response = createResponse(res);

    return get().then((resp) => response(resp));
};
