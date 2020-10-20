import { updatePayment } from '../../server/donation';
import { createPayload } from '../../server/helpers'; 


export default function handler(req, res) {
    if(req.method.toLowerCase() === 'post') {
        const { type, status, id } = req.body;

        console.log('mbway notification > ', type, status, id);
        if(type === 'capture' && status === 'success') {
            updatePayment(id)
            .then((results) => {
                res.send(createPayload('success', results));
            }).catch((e) => {
                res.status(500);
                res.send(createPayload('error', e));
            });
        }
    } else {
        res.status(400);
        res.send(createPayload('error'));
    }
}