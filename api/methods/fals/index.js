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


    app.post('/api/insertUserFalRequest', authenticateToken, async (req, res) => {
        const { user_id, formdata, formanswer, fal_user_id, fal_type, appointment_id, app_taken_user_id, app_date, app_time, start_hour, end_hour } = req.body;
    
        if (!user_id || user_id === 0) {
            return res.status(400).json({ message: 'Kullanıcı id gereklidir', status: 'error' });
        }
        if (!formdata) {
            return res.status(400).json({ message: 'Form verisi gereklidir', status: 'error' });
        }
        if (!formanswer) {
            return res.status(400).json({ message: 'Form cevapları gereklidir', status: 'error' });
        }
    
        try {
            // 1. 'fals' tablosuna veri ekleme
            const [fal_id] = await connection('fals')
                .insert({ 
                    user_id,
                    fal_user_id,
                    fal_type,
                    created_at: new Date(),
                    updated_at: new Date()
                })
                .returning('id');
    
            // 2. 'fal_details' tablosuna veri ekleme
            await connection('fal_details')
                .insert({ 
                    fal_id,
                    formdata,
                    formanswer,
                    status: '1000',
                    comment: '',
                    created_at: new Date(),
                    updated_at: new Date()
                });
    
            // 3. 'appointment_details' tablosuna veri ekleme
            await connection('appointment_details')
                .insert({
                    appointment_id,
                    app_taken_user_id,
                    app_date,
                    app_time,
                    start_hour,
                    end_hour,
                    created_at: new Date(),
                    updated_at: new Date()
                });
    
            // 4. Kullanıcının maliyetini ve bakiyesini kontrol etme ve güncelleme
            const [userDetails] = await connection('user_details')
                .select('*')
                .from('user_details')
                .where('user_id', fal_user_id)
                .andWhere('fal_type', fal_type);

    
            if (!userDetails || userDetails.length === 0) {
                return res.status(404).json({ status: '404', message: 'Kullanıcı bilgileri bulunamadı' });
            }
    
            const fal_cost = userDetails.cost;
    
            if (fal_cost === 0) {
                return res.status(400).json({ status: '404', message: 'Geçersiz maliyet' });
            }
    
            await connection('users')
                .where('id', user_id)
                .update({
                    balance: connection.raw('balance - ?', [fal_cost])
                });
    
            return res.status(200).json({ status: '200', message: 'Form verisi eklendi' });
    
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'İşlem sırasında hata oluştu', status: 'error' });
        }
    });

    app.post('/api/personalWaitingFals', authenticateToken, async (req, res) => {
        var user_id = req.body.user_id;
        console.log(user_id);
        if (!user_id || user_id === 0) {
            return res.status(400).json({ message: 'Kullanıcı id gereklidir', status: 'error' });
        }
        connection('fals as f')
        .join('fal_details as fd', 'f.id', 'fd.fal_id')
        .join('user_details as ud', 'ud.user_id', 'f.fal_user_id')
        .join('users as u', 'u.id', 'ud.user_id')
        .join('fal_types as ft', 'ft.id', 'f.fal_type')
        .join('situations as s', 's.statuscode', 'fd.status')
        .select(
          'f.id as fals_id',
          'fd.formanswer',
          'fd.formdata',
          'f.user_id as fals_user_id',
          'f.fal_type as fals_fal_type',
          'f.created_at as fals_created_at',
          'f.updated_at as fals_updated_at',
          'ud.id as user_details_id',
          'ud.user_id as user_details_user_id',
          'ud.balance as user_details_balance',
          'ud.fal_type as user_details_fal_type',
          'ud.cost as user_details_cost',
          'ud.created_at as user_details_created_at',
          'ud.updated_at as user_details_updated_at',
          'u.id as users_id',
          'u.username as users_username',
          'u.email as users_email',
          'u.gender as users_gender',
          'u.age as users_age',
          'u.bio as users_bio',
          'u.profile_image as users_profile_image',
          'u.status as users_status',
          'u.balance as users_balance',
          'u.created_at as users_created_at',
          'u.updated_at as users_updated_at',
          'ft.id as fal_types_id',
          'ft.name as fal_types_name',
          'ft.created_at as fal_types_created_at',
          'ft.updated_at as fal_types_updated_at',
          's.id as situations_id',
          's.statuscode as situations_statuscode',
          's.name as situations_name',
          's.type as situations_type',
          's.created_at as situations_created_at',
          's.updated_at as situations_updated_at'
        )
        .where('f.fal_user_id', user_id)
        .andWhere('s.type', 1)
        .andWhere('ud.fal_type', connection.raw('f.fal_type'))
        .orderBy('f.created_at', 'desc')
        .then(rows => {
          return res.status(200).json(rows);
        })
        .catch(error => {
          console.error(error);
        });
    });


    app.post('/api/userWaitingFals', authenticateToken, async (req, res) => {
        var user_id = req.body.user_id;
        console.log(user_id);
        if (!user_id || user_id === 0) {
            return res.status(400).json({ message: 'Kullanıcı id gereklidir', status: 'error' });
        }
        connection('fals as f')
        .join('fal_details as fd', 'f.id', 'fd.fal_id')
        .join('user_details as ud', 'ud.user_id', 'f.fal_user_id')
        .join('users as u', 'u.id', 'ud.user_id')
        .join('fal_types as ft', 'ft.id', 'f.fal_type')
        .join('situations as s', 's.statuscode', 'fd.status')
        .select(
          'f.id as fals_id',
          'fd.formanswer',
          'fd.formdata',
          'f.user_id as fals_user_id',
          'f.fal_type as fals_fal_type',
          'f.created_at as fals_created_at',
          'f.updated_at as fals_updated_at',
          'ud.id as user_details_id',
          'ud.user_id as user_details_user_id',
          'ud.balance as user_details_balance',
          'ud.fal_type as user_details_fal_type',
          'ud.cost as user_details_cost',
          'ud.created_at as user_details_created_at',
          'ud.updated_at as user_details_updated_at',
          'u.id as users_id',
          'u.username as users_username',
          'u.email as users_email',
          'u.gender as users_gender',
          'u.age as users_age',
          'u.bio as users_bio',
          'u.profile_image as users_profile_image',
          'u.status as users_status',
          'u.balance as users_balance',
          'u.created_at as users_created_at',
          'u.updated_at as users_updated_at',
          'ft.id as fal_types_id',
          'ft.name as fal_types_name',
          'ft.created_at as fal_types_created_at',
          'ft.updated_at as fal_types_updated_at',
          's.id as situations_id',
          's.statuscode as situations_statuscode',
          's.name as situations_name',
          's.type as situations_type',
          's.created_at as situations_created_at',
          's.updated_at as situations_updated_at'
        )
        .where('f.user_id', user_id)
        .andWhere('s.type', 1)
        .andWhere('ud.fal_type', connection.raw('f.fal_type'))
        .orderBy('f.created_at', 'desc')
        .then(rows => {
          return res.status(200).json(rows);
        })
        .catch(error => {
          console.error(error);
        });
    });


    app.post('/api/sendCommentFal', authenticateToken, async (req, res) => {
        const {fal_id , comment} = req.body;
        if (!fal_id || fal_id === 0) {
            return res.status(400).json({ message: 'Fal id gereklidir', status: 'error' });
        }
        
        connection('fal_details').where('fal_id', fal_id).update({ status: 2000 ,comment: comment }).then(() => {
            return res.status(200).json({ message: 'Yorumunuz kaydedildi', status: 'success' });
        }).catch(error => {
            return res.status(400).json({ message: 'Yorumunuz kaydedilirken hata oluştu', status: 'error' });
        });

    });

}

export default FalEndPoints;