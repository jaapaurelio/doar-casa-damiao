import { updatePayment } from '../../server/donation';
import { createResponse } from '../../server/helpers'; 


export default function handler(req, res) {
    const response = createResponse(res);

    if(req.method.toLowerCase() === 'post') {
        const { type, status, id } = req.body;

        console.log('mbway notification > ', type, status, id);
        if(type === 'capture' && status === 'success') {
            updatePayment(id)
                .then((results) => response(results))
                .catch((e) => response(e, 500));
        }
    } else {
        response('error', 404);
    }
}