/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

  return knex.schema.createTable('fal_types', function(table) {
    table.increments('id').primary();
    table.string('name').comment('fal tipi adı');
    table.integer('cost', 255).comment('ucreti').nullable;
    table.timestamps(true, true);
  });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
