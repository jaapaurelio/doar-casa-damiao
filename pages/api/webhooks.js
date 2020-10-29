import { createResponse } from '../../server/helpers';
import { updateStripePayment, createPaymentCharge } from '../../server/donation';

export default function handler(req, res) {
    const response = createResponse(res);

    if (req.method.toLowerCase() === 'post') {
        const { type } = req.body;
        const data = (req.body && req.body.data && req.body.data.object) || {};

        if (type === 'charge.succeeded') {
            return updateStripePayment(data)
                .then(() => response())
                .catch(() => response({}, 500));
        } else if (type === 'source.chargeable') {
            return createPaymentCharge(data)
                .then(() => response())
                .catch(() => response({}, 500));
        }
        return response();
    }
    response('not found', 404);
}
