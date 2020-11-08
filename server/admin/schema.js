import { Validator } from 'jsonschema';

const instance = new Validator();

const schema = {
    type: 'object',
    properties: {
        operation: {
            type: 'string',
            enum: ['list', 'delete_donation'],
        },
        password: {
            type: 'string',
        },
    },
    required: ['operation', 'password'],
};

export const validate = (obj) => instance.validate(obj, schema);