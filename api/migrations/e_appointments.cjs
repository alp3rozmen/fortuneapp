/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
return knex.schema.createTable('appointments', function(table) {
    table.increments('id').primary();
    table.integer('user_details_id').comment('ud_id').unsigned();
    table.foreign('user_details_id').references('id').inTable('user_details');
    table.date('app_start_date').comment('randevu_baslangic_gunu');
    table.date('app_end_date').comment('randevu_bitis_gunu');
    table.time('start_hour').comment('randevu_baslangic_saat');
    table.time('end_hour').comment('randevu_bitis_saat');
    table.string('interval_time').comment('saat araligi');
    table.timestamps(true, true);
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
