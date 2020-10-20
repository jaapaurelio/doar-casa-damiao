import stripe from 'stripe';
import isEmpty from 'lodash/isEmpty';
import { query } from '../query';
import { sendMBMMail, submitMBway, loadMBwayPaymentUpdate } from './providers';


const handlers = {
    stripe: (name, amount, email) => {
        const instance = stripe(process.env.STRIPE_API_KEY);
    },
    iban: () => Promise.resolve({
        intentid: '',
        method: 'iban',
        site: 'iban',
    }),
    mbway: (name, amount, email, phone) => submitMBway(name, amount, email, phone)
        .then(({ id }) => ({
            intentid: id,
            method: 'mbway',
            site: 'easypay',
        })),
    mb: (name, amount, email, phone, entity, reference, paymentId) => {
        return sendMBMMail(email, amount, entity, reference).then(() => ({
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

export const updatePayment = (notificationId) => {
    return loadMBwayPaymentUpdate(notificationId)
        .then((result) => query(`UPDATE donations SET payed=1, updated_at=NOW() WHERE payment_id="${result.id}"`))
}