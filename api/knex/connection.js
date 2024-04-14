const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'fortuneteller'
    },
    migrations: {
        tableName: 'migrations',
        directory: './migrations'
    },
    seeds: {
        directory: './seeds'
    }
})

module.exports = knex