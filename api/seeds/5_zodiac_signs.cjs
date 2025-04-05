/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('zodiac_signs').del() 

  // Inserts seed entries
  await knex('zodiac_signs').insert([
    { name: 'Koç', luckynumber: '9', luckycolor: 'Kırmızı', compotiblehs: 'Terazi, Kova' },
    { name: 'Boğa', luckynumber: '6', luckycolor: 'Yeşil', compotiblehs: 'Başak, Oğlak' },
    { name: 'İkizler', luckynumber: '5', luckycolor: 'Sarı', compotiblehs: 'Terazi, Kova' },
    { name: 'Yengeç', luckynumber: '2', luckycolor: 'Beyaz', compotiblehs: 'Boğa, Balık' },
    { name: 'Aslan', luckynumber: '1', luckycolor: 'Altın Sarısı', compotiblehs: 'Koç, Yay' },
    { name: 'Başak', luckynumber: '4', luckycolor: 'Yeşil', compotiblehs: 'Boğa, Oğlak' },
    { name: 'Terazi', luckynumber: '6', luckycolor: 'Pembe', compotiblehs: 'İkizler, Kova' },
    { name: 'Akrep', luckynumber: '7', luckycolor: 'Koyu kırmızı', compotiblehs: 'Yengeç, Balık' },
    { name: 'Yay', luckynumber: '3', luckycolor: 'Mor', compotiblehs: 'Aslan, Koç' },
    { name: 'Oğlak', luckynumber: '8', luckycolor: 'Siyah', compotiblehs: 'Boğa, Başak' },
    { name: 'Kova', luckynumber: '4', luckycolor: 'Mavi', compotiblehs: 'İkizler, Terazi' },
    { name: 'Balık', luckynumber: '3', luckycolor: 'Turuncu', compotiblehs: 'Yengeç, Akrep' }
  ]);
};
