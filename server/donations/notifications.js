import Mailgun from 'mailgun-js';


var mailgun = new Mailgun({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_URL,
});

export const send = (to, amount, entity, reference) => {
    var data = {
        from: 'Casa Damiao <geral@casadamiao.pt>',
        to,
        subject: 'Dados MB para a sua Doação',
        template: 'mb_notify',
        'h:X-Mailgun-Variables': JSON.stringify({
            amount, 
            entity, 
            reference
        }),
    }

    return new Promise((resolve, reject) => {
        mailgun.messages().send(data, (err, body) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(body);
            }
        });  
    });
}
