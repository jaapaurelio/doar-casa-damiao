import { validate, create } from '../../server/donation';
import { createResponse } from '../../server/helpers';


export default function handler(req, res) {
    const response = createResponse(res);

    if(req.method === 'POST') {
        const check = validate(req.body);    

        if(!check.valid) {
            response(check.toString(), 400);
        } else {
            const { provider, name, email, amount, phone, entity, reference, paymentId } = req.body

            create(provider, name, amount, email, phone, entity, reference, paymentId)
                .then(results => response(results))
                .catch(error => response(error, 500));
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