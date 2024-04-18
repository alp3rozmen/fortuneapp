/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_details', function(table) {
        table.increments('id').primary();
        table.integer('user_id').comment('user_id');
        table.foreign('user_id').references('users.id');
        table.string('profile_image').comment('profil resmi');
        table.string('gender').comment('cinsiyet');
        table.string('age').comment('yas');
        table.string('bio').comment('bio');        
        table.string('balance').comment('kazandıgı balance');
        table.integer('fal_type').comment('baktigim fal tipi');
        table.foreign('fal_type').references('fal_types.id');
        table.string('cost').comment('ucreti');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
