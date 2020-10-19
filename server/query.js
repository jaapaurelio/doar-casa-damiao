import { connection } from './connection';


export const query = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) reject(error);
            resolve(results);
        });
    });
}