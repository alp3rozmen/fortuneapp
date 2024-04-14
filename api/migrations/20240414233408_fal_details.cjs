/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

  return knex.schema.createTable('fal_details', function(table) {
    table.increments('id').primary();
    table.integer('fal_id').comment('fals_id');
    table.foreign('fal_id').references('fals.id');
    table.string('gender').comment('cinsiyet');
    table.string('age').comment('yas');
    table.string('status').comment('status');
    table.string('city').comment('sehir');
    table.string('country').comment('ulke');
    table.string('type').comment('bakmakistedigitip 1 ask 2 is 3 her ikiside 4 digerler');
    table.string('comment').comment('falyorumu');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
