import Mailgun from 'mailgun-js';

const mailgun = new Mailgun({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

export const send = (data) =>
    new Promise((resolve, reject) =>
        mailgun.messages().send(data, (err, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    );
