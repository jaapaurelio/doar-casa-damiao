import { validate, create } from '../../server/donations';



export default function handler(req, res) {
    if(req.method === 'POST') {
        const check = validate(req.body);

        if(!check.valid) {
            res.status(400);
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ status: 'error', data: check }));
        } else {
            const { provider, name, email, amount, phone, entity, reference, paymentId } = req.body

            create(provider, name, amount, email, phone, entity, reference, paymentId).then((results) => {
                res.status(200);
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ status: 'success', data: results }));
            });
        }
    }
}

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '500kb',
      },
    },
  }