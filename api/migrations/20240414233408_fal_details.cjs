/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

  return knex.schema.createTable('fal_details', function(table) {
    table.increments('id').primary();
    table.integer('fal_id').comment('fals_id').unsigned();
    table.foreign('fal_id').references('id').inTable('fals');
    table.string('gender').comment('cinsiyet');
    table.string('age').comment('yas');
    table.string('status').comment('status');
    table.string('city').comment('sehir');
    table.string('country').comment('ulke');
    table.string('type').comment('bakmakistedigi tip 1 ask 2 is 3 her ikiside 4 digerler');
    table.binary('image1_url').comment('resim1');  //ilk fal resmi
    table.binary('image2_url').comment('resim2');  //ikinci fal resmi
    table.binary('image3_url').comment('resim3');  //ucuncu fal resmi
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
