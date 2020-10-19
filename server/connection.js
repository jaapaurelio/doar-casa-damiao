import mysql from 'mysql'

export const connection = mysql.createConnection({
    host     : process.env.DB_HOST || '127.0.0.1',
    port     : process.env.DB_PORT || 3306,
    user     : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || '',
    database : process.env.DB_NAME  || '',
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql: error connecting: ' + err.stack);
        return;
    }

    console.log('mysql: connected as id ' + connection.threadId);
});