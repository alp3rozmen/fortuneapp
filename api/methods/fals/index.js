import authenticateToken from "../middleware/index.js";

function FalEndPoints(app , connection) {

    app.get('/api/getFalTypes', (req, res) => {
        connection.select('fal_types.*' ).from('fal_types').then((faltypes) => {
            return res.status(200).json(faltypes);
        });
    })

    
    app.post('/api/InsertFalType', authenticateToken, (req, res) => {
        var fal_name = req.body.fal_name;
        
        connection.select('fal_types.*' ).from('fal_types').where('fal_types.name', fal_name).then((faltypes) => {
            if (faltypes.length > 0) {
                return res.status(200).json({ message: 'Fal tipi zaten mevcut', status: '400' });
            }
            else if (fal_name === undefined || fal_name === 0 || fal_name === '') {
                return res.status(200).json({ message: 'Bakım türü adı gereklidir', status: 'error' });
            }
            else {
                connection.insert({ 
                    name: fal_name,
                    created_at : new Date(),
                    updated_at : new Date()
                }).into('fal_types').then((faltypes) => {
                    return res.status(200).json({
                        status: '200',
                        message: 'Fal tipi eklendi'
                    });
                });
            }
        });
    })

    app.post('/api/DeleteFalType', authenticateToken, (req, res) => {
        var fal_id = req.body.fal_id;
        
        if (fal_id === undefined || fal_id === 0) {
            return res.status(200).json({ message: 'Bakım türü id gereklidir', status: 'error' });
        }
        
        connection.select('user_details.*' ).from('user_details').where('fal_type', fal_id).then((faltypes) => {
            if (faltypes.length > 0) {
                return res.status(200).json({ message: 'Bakım türü kullanan kullanıcı var!', status: '400' });
            }
            else
            {
                connection.delete().from('fal_types').where('id', fal_id).then((faltypes) => {
                    return res.status(200).json({
                        status: '200',
                        message: 'Fal tipi silindi'
                    });
                });
            }
        });
    })

    app.delete('/api/DeleteFalType', authenticateToken, (req, res) => {
        var fal_type_id = req.body.fal_id;
        
        if (fal_type_id === undefined || fal_type_id === 0) {
            return res.status(200).json({ message: 'Bakım türü id gereklidir', status: 'error' });
        }
        
        connection.delete().from('fal_types').where('id', fal_type_id).then((faltypes) => {
            return res.status(200).json({
                status: '200',
                message: 'Fal tipi silindi'
            });
        });
    })

    app.put('/api/UpdateFalType', authenticateToken, (req, res) => {
        var fal_id = req.body.fal_id;
        var fal_name = req.body.fal_name;
        
        if (fal_id === undefined || fal_id === 0) {
            return res.status(200).json({ message: 'Bakım türü id gereklidir', status: 'error' });
        }
        else if (fal_name === undefined || fal_name === 0 || fal_name === '') {
            return res.status(200).json({ message: 'Bakım türü adı gereklidir', status: 'error' });
        }
        else
        {
            connection.update({ 
                name: fal_name,
                updated_at : new Date()
            }).from('fal_types').where('id', fal_id).then((faltypes) => {
                return res.status(200).json({
                    status: '200',
                    message: 'Fal tipi güncellendi'
                });
            });
        }
    })


    app.post('/api/insertFalDesign', authenticateToken, (req, res) => {
        const fal_type_id = req.body.fal_type_id;
        const form_data = req.body.form_data;
        
    
        if (fal_type_id === undefined || fal_type_id === 0) {
            return res.status(400).json({ message: 'Bakım türü id gereklidir', status: 'error' });
        }
        if (form_data === undefined || form_data === '' || form_data === 0) {   
            return res.status(400).json({ message: 'Form verisi gereklidir', status: 'error' });
        }
    
        // Silme işlemini yap
        connection.delete().from('fal_type_design').where('fal_type', fal_type_id)
            .then(() => {
                // Silme işlemi tamamlandığında ekleme işlemini yap
                return connection.insert({ 
                    formdata: form_data,
                    fal_type: fal_type_id,
                    created_at : new Date(),
                    updated_at : new Date()
                }).into('fal_type_design');
            })
            .then(() => {
                // Ekleme işlemi tamamlandığında yanıt gönder
                return res.status(200).json({
                    status: '200',
                    message: 'Form verisi eklendi'
                });
            })
            .catch((error) => {
                // Herhangi bir hata oluşursa yanıt gönder
                console.error('Error:', error);
                return res.status(500).json({ message: 'İşlem sırasında hata oluştu', status: 'error' });
            });
    });
    

    app.post('/api/getFalDesign', authenticateToken, (req, res) => {
       
        var fal_type_id = req.body.fal_type_id;
        
        if (fal_type_id === undefined || fal_type_id === 0) {
            return res.status(200).json({ message: 'Bakım türü id gereklidir', status: 'error' });
        }
        else
        {


            connection.select().from('fal_type_design').where('fal_type', fal_type_id).then((faltypes) => {
                
                if (faltypes.length === 0) {
                    return res.status(200).json({ message: 'Form verisi bulunamadı', status: '404' });
                }

                return res.status(200).json({
                    status: '200',
                    message: 'Form verisi getirildi',
                    data : faltypes
                });
            });
        }
    
    })


    app.post('/api/insertUserFalRequest', authenticateToken, (req, res) => {

        var user_id = req.body.user_id;
        var formdata = req.body.formdata;
        var formanswer = req.body.formanswer;
        var fal_user_id = req.body.fal_user_id; //HANGİ FALCIYA FALS TABLOSUNA INSERT

        var appointment_id = req.body.appointment_id;
        var app_taken_user_id = req.body.app_taken_user_id;
        var app_date = req.body.app_date;
        var app_time = req.body.app_time;
        var start_hour = req.body.start_hour;
        var end_hour = req.body.end_hour;


        if (user_id === undefined || user_id === 0) {
            return res.status(400).json({ message: 'Kullanıcı id gereklidir', status: 'error' });
        }
        if (formdata === undefined || formdata === '' || formdata === 0) {   
            return res.status(400).json({ message: 'Form verisi gereklidir', status: 'error' });
        }
        if (formanswer === undefined || formanswer === '' || formanswer === 0) {   
            return res.status(400).json({ message: 'Form cevapları gereklidir', status: 'error' });
        }

        const insertData = async (pconnection , puser_id, pfal_user_id, pformdata, pformanswer, pres) => {
            try {
              // 1. 'fals' tablosuna veri ekleme
              const [fal_id] = await pconnection('fals')
                .insert({ 
                  user_id: puser_id,
                  fal_user_id: pfal_user_id,
                  created_at: new Date(),
                  updated_at: new Date()
                })
                .returning('id'); 

              // 2. 'fal_details' tablosuna veri ekleme
              await pconnection('fal_details')
                .insert({ 
                  fal_id: fal_id,
                  formdata: pformdata,
                  formanswer: pformanswer,
                  status: '1000',
                  comment: '',
                  created_at: new Date(),
                  updated_at: new Date()
                });
          
                await pconnection('appointment_details')
                .insert({
                  appointment_id: appointment_id,
                  app_taken_user_id: app_taken_user_id,
                  app_date: app_date,
                  app_time: app_time,
                  start_hour: start_hour,
                  end_hour: end_hour,
                  created_at: new Date(),
                  updated_at: new Date()
                }).then(() => {
                    // Ekleme işlemi tamamlandığında yanıt gönder
                    return pres.status(200).json({
                        status: '200',
                        message: 'Form verisi eklendi'
                    }); 
                });
                
            
            } catch (error) {
              // Hata durumunda hata mesajı döndürme
              console.error('Error:', error);
              return pres.status(500).json({ message: 'İşlem sırasında hata oluştu', status: 'error' });
            }
          };        

          return insertData(connection, user_id, fal_user_id, formdata, formanswer, res);

    })

}

export default FalEndPoints;