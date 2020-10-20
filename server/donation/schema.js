import { Validator } from 'jsonschema';

const instance = new Validator();


const schema = {
    type: 'object',
    properties: {
        provider: {
            type: 'string',
            enum: ['stripe', 'iban', 'mb', 'mbway'],
        }, 
        name: {
            type: 'string'
        },
        email: {
           type: 'string',
           format: 'email'
        },
        amount: {
            type: 'number'
        },
        phone: {
            type: 'string',
        },
        entity: {
            type: 'string',
        },
        reference: {
            type: 'string',
        },
        paymentId: {
            type: 'string',
        },
    },
    required: ['provider', 'email', 'amount', 'phone'],
};



export const validate = obj => instance.validate(obj, schema);