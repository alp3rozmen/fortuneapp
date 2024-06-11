/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_comments', function(table) {
        table.increments('id').primary();
        table.integer('user_id').comment('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('users');
        table.string('comment').comment('yorum');
        table.integer('commented_user_id').comment('yorum yapan user_id').unsigned();
        table.foreign('commented_user_id').references('id').inTable('users');
        table.integer('comment_stars', 1).comment('yorum puanı');
        table.timestamps(true, true);
    }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
