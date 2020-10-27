import isEmpty from 'lodash/isEmpty';
import { query } from '../query';
import { 
    sendMBMMail,
    submitMBway,
    loadMBwayPaymentUpdate,
    createPaymentIntent,
    sendStripeMail,
    sendGeneralEmail
} from './providers';


const handlers = {
    stripe: (name, amount, email) => createPaymentIntent(amount, email)
        .then((paymentIntent) => ({
            intentid: paymentIntent.client_secret,
            method: 'card',
            site: 'stripe',
        })),
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
        .then(({ intentid, method, site }) => {
            
            return {
                results: query(`INSERT INTO donations 
                    (donor_name, total_amount, email, payment_id, payment_method, from_site, notes,  anonym, payed) 
                    VALUES 
                    ('${name}', '${amount * 100}', '${email}', '${intentid}', '${method}', '${site}', '', '${anonym}', '0')`
                ),
                donationData: {intentid, method, site}
            }
         })
        .then(({results, donationData})  => {
            return {
                donation: query(`SELECT donor_name, total_amount, email, payment_id, payment_method, from_site, anonym, payed FROM donations WHERE id=${results.insertId}`),
                donationData
            }
            });
};

export const updatePayment = (notificationId) => {
    return loadMBwayPaymentUpdate(notificationId)
        .then((result) => query(`UPDATE donations SET payed=1, updated_at=NOW() WHERE payment_id="${result.id}"`))
}

export const updateStripePayment = (data) => {
    const { payment_intent, payment_method_details, payment_method, billing_details = {}, amount, id} = data;
    const paymentId = payment_method_details.type === 'multibanco' ? payment_method : payment_intent;

    return query(`UPDATE donations SET payed=1, updated_at=NOW() WHERE payment_id="${paymentId}"`)
        .then(() => query(`SELECT donor_name FROM donations WHERE payment_id="${paymentId}"`))
        .then(({ donor_name }) => sendStripeMail(donor_name, billing_details.email, id))
        .then(() => sendGeneralEmail(billing_details.email, amount / 100))
        
}