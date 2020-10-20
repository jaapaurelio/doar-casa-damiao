import axios from 'axios';
import { send } from '../mail';
import get from 'lodash/get';


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
            reference
        }),
    }

    return send(data);
}


export const submitMBway = (name, amount, email, phone) => axios({
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
        headers: mbWayHeaders,
        timeout: 60 * 1000,
    })
    .then((response) => response.data);

export const loadMBwayPaymentUpdate = notificationId => axios({
        method: 'get',
        url: `${process.env.EASY_PAY_URL}/single?id=${notificationId}`,
        headers: mbWayHeaders
    })
    .then((results) => get(results, 'data.data[0]', {}));
