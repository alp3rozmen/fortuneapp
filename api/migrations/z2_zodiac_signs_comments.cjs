/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

  return knex.schema.createTable('zodiac_signs_comments', function(table) {
    table.increments('id').primary();
    table.integer('zodiac_sign_id').comment('Burç id').unsigned();
    table.foreign('zodiac_sign_id').references('id').inTable('zodiac_signs');
    table.text('comment', 'longtext').comment('Burç yorumu');
    table.text('commentlove', 'longtext').comment('Aşk yorumu');
    table.text('commentwork', 'longtext').comment('İş yorumu');
    table.text('commenthealth', 'longtext').comment('Sağlık yorumu');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
