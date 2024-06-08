/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_details').del()
  await knex('user_details').insert([
    {id: 1, user_id: 1, profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'E' ,age: '24', bio: 'Genel Bakımda iyi bir falcı', balance: '0', fal_type: 1 , cost : '100' },
    {id: 2, user_id: 2, profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'K' ,age: '28', bio: 'Aşk konusunda iyi bir falcı', balance: '0', fal_type: 2 , cost : '200' },
    {id: 3, user_id: 3, profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'K' ,age: '23', bio: 'İş konusunda iyi bir falcı', balance: '0', fal_type: 3 , cost : '300' },
    {id: 4, user_id: 4, profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'K' ,age: '32', bio: 'Diğer konusunda iyi bir falcı', balance: '0', fal_type: 4 , cost : '400' },
    {id: 5, user_id: 5, profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'E' ,age: '44', bio: 'Her konusunda iyi bir falcı', balance: '0', fal_type: 5 , cost : '500' },
    {id: 6, user_id: 6, profile_image: 'https://play-lh.googleusercontent.com/RvoClH1Gm-MKxFzHy54iXtwK8QLhF6yweWe3mNHbZNO62FYxo0Xt7q5QRNzQyYT5auQ', gender: 'E' ,age: '44', bio: 'Her konusunda iyi bir falcı', balance: '0', fal_type: 1 , cost : '500' },
  ]);
};
