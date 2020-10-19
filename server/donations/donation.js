import stripe from 'stripe';
import axios from 'axios';
import { query } from '../query';
import { send } from './notifications';


const handlers = {
    stripe: (name, amount, email) => {
        const instance = stripe(process.env.STRIPE_API_KEY);


    },
    iban: () => ({
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
            console.log(result);
            return result;
        }).catch(err => {
            console.error('error > ', err);
        });
    },
    mb: () => {
        send('mquintal88@gmail.com', 10, '12312312', '123123123');

        return {}
    },
}

export const create = (provider, name, amount, email, phone, anonym = 0) => {
    const { intentid, method, site } = handlers[provider](name, amount, email, phone);

    return query(`INSERT INTO donations 
        (donor_name, total_amount, email, payment_id, payment_method, from_site, notes,  anonym, payed) 
        VALUES 
        ('${name}', '${amount * 100}', '${email}', '${intentid}', '${method}', '${site}', '', '${anonym}', '0')`
    ).then(results => query(`SELECT * FROM donations WHERE id=${results.insertId}`));
};