import { query } from '../../server/query';

export const list = () =>
    query('SELECT * FROM donations WHERE created_at > "2020-10-01" ORDER BY created_at DESC');

export const deleteDonation = (id) => query(`DELETE FROM donations WHERE id="${id}" LIMIT 1`);
