/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('situations').del()
  await knex('situations').insert([
    
    //fal durumları
    {id: 1, name: 'Beklemede', type: '1' , statuscode : '1000' },
    {id: 2, name: 'Cevaplandı', type: '1' , statuscode : '2000' },
    {id: 3, name: 'Reddedildi', type: '1' , statuscode : '3000' },
    {id: 4, name: 'Iptal Edildi', type: '1' , statuscode : '4000' },

    //kullanıcı durumları
    {id: 5, name: 'Aktif', type: '2' , statuscode : '1000' },
    {id: 6, name: 'Pasif', type: '2' , statuscode : '2000' },
    {id: 7, name: 'Kısıtlandı', type: '2' , statuscode : '3000' }

  ]);
};
