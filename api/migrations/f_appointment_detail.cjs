/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('appointment_details', function(table) {
        table.increments('id').primary();
        table.integer('appointment_id').comment('randevu_id').unsigned();
        table.foreign('appointment_id').references('id').inTable('appointments');
        table.integer('app_taken_user_id').comment('alan_kullanici_id').unsigned();
        table.foreign('app_taken_user_id').references('id').inTable('users');
        table.dateTime('app_date').comment('randevutarihi');
        table.dateTime('app_time').comment('alinansaat');
        table.time('start_hour').comment('baslangic_saat');
        table.time('end_hour').comment('bitis_saat');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
