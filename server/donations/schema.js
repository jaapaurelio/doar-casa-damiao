import { Validator } from 'jsonschema';

const instance = new Validator();


const schema = {
    "type": "object",
    "properties": {
        "provider": {
            "type": "string",
            "enum": ["stripe", "iban", "mb", "mbway"]
        }, 
        "name": {
            "type": "string"
        },
        "email": {
           "type": "string",
           "format": "email"
        },
        "amount": {
            "type": "string"
        },
        "phone": {
            "type": "string",
        }
    }
}

export const validate = obj => instance.validate(obj, schema);