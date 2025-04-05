// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  
  development: {
    client: 'mysql',
    connection: {
      secureAuth: false,
      host : '127.0.0.1',
      port : '3306',
      user : 'root',
      password : 'example',
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

