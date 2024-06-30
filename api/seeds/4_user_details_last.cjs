/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_details').del() 
  await knex('user_details').insert([
    {id: 1, user_id: 3, balance: '0', fal_type: 1 , cost : '100' },
    {id: 2, user_id: 4, balance: '0', fal_type: 2 , cost : '200' },
    {id: 3, user_id: 5, balance: '0', fal_type: 3 , cost : '300' },
    {id: 4, user_id: 6, balance: '0', fal_type: 4 , cost : '400' },
    {id: 5, user_id: 7, balance: '0', fal_type: 5 , cost : '500' },
    {id: 6, user_id: 8, balance: '0', fal_type: 1 , cost : '500' },
  ]);
};
