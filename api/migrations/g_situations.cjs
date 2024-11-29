/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
  return knex.schema.createTable('situations', function(table) {
    table.increments('id').primary();
    table.string('statuscode').comment('durumkodu');
    table.string('name').comment('durum adı');
    table.string('type').comment('durum tipi 1 fal durumları 2 kullanıcı durumları');
    table.timestamps(true, true);
  });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
