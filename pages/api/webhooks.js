import { createResponse } from '../../server/helpers';
import { updateStripePayment, createPaymentCharge } from '../../server/donation'

export default function handler(req, res) {
    const response = createResponse(res);

    if(req.method.toLowerCase() === 'post') {
        const { type }  = req.body;
        const data = req.body && req.body.data && req.body.data.object || {};
        
        if (type === 'charge.succeeded') {
            updateStripePayment(data)
                .then(() => response())
                .catch(() => response({}, 500));
        } else if(type === 'source.chargeable') {
            createPaymentCharge(data)
                .then(() => response())
                .catch(() => response({}, 500));
        } else {
            response();
        }

    } else {
        response('not found', 404);
    }

}