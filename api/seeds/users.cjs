/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
bcrypt = require("bcrypt");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      username: 'alp3rozmen', email:
        'test@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      user_role: '3',
      status: '1',
      balance: '1000',
      profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'E', age: '24', bio :''

    }, // 1 normal kullanıcı 2 falcı 3 admin
    { username: 'Normal Kullanıcı', email: 'falci@gmail.com', password: bcrypt.hashSync('123456', 10), user_role: '1', status: '1', balance: '1000', profile_image: '', gender: 'K', age: '28',bio : '' },
    { username: 'Falci', email: 'Falci@gmail.com', password: bcrypt.hashSync('123456', 10), user_role: '2', status: '1', balance: '1000', profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'K', age: '23', bio: 'İş konusunda iyi bir falcı' },
    { username: 'Falci1', email: 'Falci1@gmail.com', password: bcrypt.hashSync('123456', 10), user_role: '2', status: '1', balance: '1000', profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'K', age: '32', bio: 'Diğer konusunda iyi bir falcı' },
    { username: 'Falci2', email: 'Falci2@gmail.com', password: bcrypt.hashSync('123456', 10), user_role: '2', status: '1', balance: '1000', profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'E', age: '44', bio: 'Her konusunda iyi bir falcı' },
    { username: 'Falci3', email: 'Falci3@gmail.com', password: bcrypt.hashSync('123456', 10), user_role: '2', status: '1', balance: '1000', profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'E', age: '44', bio: 'Her konusunda iyi bir falcı' },
    { username: 'Falci4', email: 'Falci4@gmail.com', password: bcrypt.hashSync('123456', 10), user_role: '2', status: '1', balance: '1000', profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'E', age: '24', bio: 'İş konusunda iyi bir falcı' },
    { username: 'Falci5', email: 'Falci5@gmail.com', password: bcrypt.hashSync('123456', 10), user_role: '2', status: '1', balance: '1000', profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'E', age: '24', bio: 'İş konusunda iyi bir falcı' },
  ]);
};
