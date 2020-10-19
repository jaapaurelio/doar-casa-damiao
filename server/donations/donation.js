import stripe from 'stripe';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { query } from '../query';
import { send } from './notifications';


const handlers = {
    stripe: (name, amount, email) => {
        const instance = stripe(process.env.STRIPE_API_KEY);


    },
    iban: () => Promise.resolve({
        intentid: '',
        method: 'iban',
        site: 'iban',
    }),
    mbway: (name, amount, email, phone) => {
        return axios({
            method: 'post',
            url: `${process.env.EASY_PAY_URL}/single`,
            data: {
                key: process.env.EASY_PAY_KEY,
                method: 'mbw',
                type: 'sale',
                value: amount,
                currency: 'EUR',
                customer: {
                    name,
                    email,
                    phone,
                }
            },
            headers: {
                AccountId: process.env.EASY_PAY_ACCOUNT_ID,
                ApiKey: process.env.EASY_PAY_KEY,
                'Content-Type': 'application/json',
            },
            timeout: 60 * 1000,
        }).then(result => {
            return result;
        }).catch(err => {
            console.error('error > ', err);
            return {}
        });
    },
    mb: (name, amount, email, phone, entity, reference, paymentId) => {
        return send(email, amount, entity, reference).then(() => ({
            intentid: paymentId,
            method: 'multibanco',
            site: 'stripe',
        }));
    },
}

export const create = (provider, name, amount, email, phone, entity, reference, paymentId) => {
    const anonym = isEmpty(name) ? 1 : 0;

    return handlers[provider](name, amount, email, phone, entity, reference, paymentId)
        .then(({ intentid, method, site }) => query(`INSERT INTO donations 
                (donor_name, total_amount, email, payment_id, payment_method, from_site, notes,  anonym, payed) 
                VALUES 
                ('${name}', '${amount * 100}', '${email}', '${intentid}', '${method}', '${site}', '', '${anonym}', '0')`
        ))
        .then(results => query(`SELECT * FROM donations WHERE id=${results.insertId}`));
};