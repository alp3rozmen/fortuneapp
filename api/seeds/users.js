/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
bcrypt = require("bcrypt");
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { username: 'alp3rozmen', email: 'test@gmail.com', password: bcrypt.hashSync('123456', 10), user_role : '3' }, // 1 normal kullanıcı 2 falcı 3 admin
    { username: 'normal', email: 'normal@gmail.com', password:  bcrypt.hashSync('123456', 10), user_role : '2' },
    { username: 'falci', email: 'falci@gmail.com', password: bcrypt.hashSync('123456', 10), user_role : '1' }
  ]);
};
