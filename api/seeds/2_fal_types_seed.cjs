/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('fal_types').del()
  await knex('fal_types').insert([
    {id: 1, name: 'Kahve Falı'},
    {id: 2, name: 'Tarot Falı'},
    {id: 3, name: 'Katina Falı'},
    {id: 4, name: 'Yıldızname Falı'},
    {id: 5, name: 'Su Falı'}
  ]);
};
