import { query } from '../query';

export const create = (characters, email, name = '') =>
    query(`
    INSERT INTO story 
    (name, email, characters, created_at)
    VALUES
    ("${name}", "${email}", "${characters}", NOW())`)
        .then(({ insertId }) =>
            query(`SELECT id, name, email, characters FROM story WHERE id="${insertId}"`)
        )
        .then((results) => results[0] || {});

export const list = () =>
    query(
        'SELECT name, email, characters, created_at FROM story ORDER BY created_at DESC'
    ).then((stories) =>
        stories.map((story) => ({ ...story, characters: story.characters.split(';') }))
    );
