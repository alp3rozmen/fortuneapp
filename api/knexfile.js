// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
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
  }

};
