/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
  return knex.schema.createTable('fals', function(table) {
    table.increments('id').primary();
    table.integer('user_id').comment('hangi kullanıcı fal isteginde bulundu'); // hangi kullanıcı
    table.integer('fal_user_id').comment('kime bakım isteginde bulundu'); // kime 
    table.integer('fal_type').comment('hangi fala bakım isteginde bulundu'); // kime 
    table.timestamps(true, true);
  });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
