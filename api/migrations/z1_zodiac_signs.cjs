/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

  return knex.schema.createTable('zodiac_signs', function(table) {
    table.increments('id').primary();
    table.string('name').comment('Burç adı'); 
    table.string('luckynumber').comment('şanslı sayı');
    table.string('luckycolor').comment('şanslı renk');
    table.string('compotiblehs').comment('uyumlu burç');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
