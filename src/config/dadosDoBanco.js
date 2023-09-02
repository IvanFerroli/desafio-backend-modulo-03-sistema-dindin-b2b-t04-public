const { Pool } = require('pg');

const conectarBanco = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dindin',
    password: 'Pos5428*',
    port: 5432

});

module.exports = conectarBanco