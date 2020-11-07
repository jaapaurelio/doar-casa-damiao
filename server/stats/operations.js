import { query } from '../query';
import lget from 'lodash/get';

export const get = () => {
    const stories = query('SELECT COUNT(*) as n_stories FROM story');
    const donations = query(
        'SELECT COUNT(*) as n_donations, SUM(total_amount) as total_donated FROM donations WHERE YEAR(created_at) > 2019'
    );

    return Promise.all([stories, donations]).then((responses) => ({
        ...lget(responses, '0.0', {}),
        ...lget(responses, '1.0', {}),
    }));
};
