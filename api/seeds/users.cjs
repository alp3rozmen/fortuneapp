/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
bcrypt = require("bcrypt");
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { username: 'alp3rozmen', email: 'test@gmail.com', password: bcrypt.hashSync('123456', 10), user_role : '3' , status : '1' , balance : '1000'}, // 1 normal kullanıcı 2 falcı 3 admin
    { username: 'Normal Kullanıcı', email: 'falci@gmail.com', password: bcrypt.hashSync('123456', 10), user_role : '1' , status : '1' , balance : '1000'},
    { username: 'Falci', email: 'Falci@gmail.com', password:  bcrypt.hashSync('123456', 10), user_role : '2', status : '1' , balance : '1000' },
    { username: 'Falci1', email: 'Falci1@gmail.com', password:  bcrypt.hashSync('123456', 10), user_role : '2', status : '1' , balance : '1000' },
    { username: 'Falci2', email: 'Falci2@gmail.com', password:  bcrypt.hashSync('123456', 10), user_role : '2', status : '1' , balance : '1000' },
    { username: 'Falci3', email: 'Falci3@gmail.com', password:  bcrypt.hashSync('123456', 10), user_role : '2', status : '1' , balance : '1000' },
    { username: 'Falci4', email: 'Falci4@gmail.com', password:  bcrypt.hashSync('123456', 10), user_role : '2', status : '1' , balance : '1000' },
    { username: 'Falci5', email: 'Falci5@gmail.com', password:  bcrypt.hashSync('123456', 10), user_role : '2', status : '1' , balance : '1000' },
  ]);
};
