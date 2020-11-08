import { validate, list, deleteDonation } from '../../server/admin';
import { createResponse } from '../../server/helpers';
import crypto from 'crypto'

const validateRequest  = (req) => {
    if(!validate(req.query).valid) {
        return false
    }
    const { password } = req.query;
    const sha1 = crypto.createHash('sha1');
    sha1.update(password)

    return process.env.ADMIN_PASSWORD === sha1.digest('hex');
}

export default (req, res) => {
    const response = createResponse(res);
    const valid = validateRequest(req);

    if(valid) {
        const { operation } = req.query
        if(operation === 'list') {
            return list()
                .then(results => response(results))
                .catch((e) => response(e, 500));
        } else if(operation === 'delete_donation') {
            return deleteDonation(req.query.id)
                .then(results => response(results))
                .catch((e) => response(e, 500));
        }
        return response('', 404);
    }
    return response('', 401);
}