/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('fal_type_design', function(table) {
        table.increments('id').primary();
        table.text('formdata').comment('tasarımı');
        table.integer('fal_type').comment('hangi tip').unsigned();
        table.foreign('fal_type').references('id').inTable('fal_types');
        table.timestamps(true, true);
    });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
