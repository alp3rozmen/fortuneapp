/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

  return knex.schema.createTable('fal_details', function(table) {
    table.increments('id').primary();
    table.integer('fal_id').comment('fals_id').unsigned();
    table.foreign('fal_id').references('id').inTable('fals');
    table.text('formdata').comment('formun tasarımı');
    table.text('formanswer').comment('formun cevapları');
    table.string('status').comment('status');  
    table.string('comment').comment('falyorumu');
    table.integer('app_detail_id').comment('appointment_details_id').unsigned();
    table.foreign('app_detail_id').references('id').inTable('appointment_details');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
