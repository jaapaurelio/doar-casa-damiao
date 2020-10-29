import axios from 'axios';
import stripe from 'stripe';
import { send } from '../mail';
import get from 'lodash/get';

const stripeInst = stripe(process.env.STRIPE_API_KEY);
const mbWayHeaders = {
    AccountId: process.env.EASY_PAY_ACCOUNT_ID,
    ApiKey: process.env.EASY_PAY_KEY,
    'Content-Type': 'application/json',
};

export const sendMBMMail = (to, amount, entity, reference) => {
    const data = {
        from: process.env.EMAIL,
        to,
        subject: 'Dados MB para a sua Doação',
        template: 'mb_notify',
        'h:X-Mailgun-Variables': JSON.stringify({
            amount,
            entity,
            reference,
        }),
    };

    return send(data);
};

export const sendStripeMail = (donor, to, paymentId) => {
    const data = {
        from: process.env.EMAIL,
        to,
        subject: 'Doação Casa Damião',
        template: 'success_payment_mail_v2',
        'h:X-Mailgun-Variables': JSON.stringify({
            donor,
            paymentId,
        }),
    };

    return send(data);
};

export const sendGeneralEmail = (email, amount) => {
    const data = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Recebemos uma Doação',
        template: 'payment_notify_geral',
        'h:X-Mailgun-Variables': JSON.stringify({
            amount,
            email,
        }),
    };
    return send(data);
};

export const submitMBway = (name, amount, email, phone) =>
    axios({
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
            },
        },
        headers: mbWayHeaders,
        timeout: 60 * 1000,
    }).then((response) => response.data);

export const loadMBwayPaymentUpdate = (notificationId) =>
    axios({
        method: 'get',
        url: `${process.env.EASY_PAY_URL}/single?id=${notificationId}`,
        headers: mbWayHeaders,
    }).then((results) => get(results, 'data.data[0]', {}));

export const createPaymentIntent = (amount, email) =>
    stripeInst.paymentIntents.create({
        amount: amount * 100,
        currency: 'eur',
        receipt_email: email,
    });

export const createCharge = (id, amount, currency) =>
    stripeInst.charges.create({
        amount,
        currency,
        source: id,
    });
