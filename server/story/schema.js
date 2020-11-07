import { Validator } from 'jsonschema';

const instance = new Validator();

const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
        email: {
            type: 'string',
            format: 'email',
        },
        characters: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
    required: ['email', 'characters'],
};

export const validate = (obj) => instance.validate(obj, schema);
