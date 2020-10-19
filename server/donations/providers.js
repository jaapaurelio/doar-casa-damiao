import axios from 'axios';
import { send } from '../mail';


export const sendMBMMail = (to, amount, entity, reference) => {
    const data = {
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
        headers: {
            AccountId: process.env.EASY_PAY_ACCOUNT_ID,
            ApiKey: process.env.EASY_PAY_KEY,
            'Content-Type': 'application/json',
        },
        timeout: 60 * 1000,
    })
    .then((response) => response.data);
