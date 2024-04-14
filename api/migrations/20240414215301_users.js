/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username').comment('Kullanıcı adı');
        table.string('email').comment('E-posta');
        table.string('password').comment('Sifre');
        table.string('user_role').comment('role');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
