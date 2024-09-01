import authenticateToken from "../middleware/index.js";

function userDetails(app , connection) {

    app.post('/api/getUserFalAndCost', (req, res) => {
        var userid = req.body.id;
        
        if (userid === undefined || userid === 0) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
        }
        connection.select('fal_types.*' ).select('user_details.id as user_details_id').select('user_details.cost').from('users').join('user_details', 'user_details.user_id', 'users.id').join('fal_types', 'fal_types.id', 'user_details.fal_type').where('users.id', userid).then((users) => {
            return res.status(200).json(users);
        });
    })


    // app.post('/api/InsertFalType', authenticateToken, (req, res) => {
    //     var fal_name = req.body.fal_name;
        
    //     connection.select('fal_types.*' ).from('fal_types').where('fal_types.name', fal_name).then((faltypes) => {
    //         if (faltypes.length > 0) {
    //             return res.status(200).json({ message: 'Fal tipi zaten mevcut', status: '400' });
    //         }
    //         else if (fal_name === undefined || fal_name === 0 || fal_name === '') {
    //             return res.status(200).json({ message: 'Bakım türü adı gereklidir', status: 'error' });
    //         }
    //         else {
    //             connection.insert({ 
    //                 name: fal_name,
    //                 created_at : new Date(),
    //                 updated_at : new Date()
    //             }).into('fal_types').then((faltypes) => {
    //                 return res.status(200).json({
    //                     status: '200',
    //                     message: 'Fal tipi eklendi'
    //                 });
    //             });
    //         }
    //     });
    // })

    app.post('/api/insertToUserFalType', (req, res) => {
        var faltype_id = req.body.faltype_id;
        var cost = req.body.cost;
        var userid = req.body.userid;
       
        if (faltype_id === undefined || faltype_id === 0 || cost === undefined || cost === 0 || userid === undefined || userid === 0) {
            return res.status(200).json({ message: 'Lütfen parametreleri kontrol edin', status: '200' });
        }
        

        connection.select('fal_types.*' ).from('fal_types').where('fal_types.id', faltype_id).then((faltypes) => {
            if (faltypes.length === 0) {
                return res.status(200).json({ message: 'Fal tipi bulunamadı', status: '400' });
            }
            else{
                connection.insert({ 
                    fal_type: faltype_id,
                    cost: cost,
                    user_id: userid,
                    balance : 0,
                    created_at : new Date(),
                    updated_at : new Date()
                }).into('user_details').then((faltypes) => {
                    return res.status(200).json({
                        status: '200',
                        message: 'Fal tipi eklendi'
                    });
                });
                        
            }
        });
    })

    app.delete('/api/DeleteUserFalType/:id', (req, res) => {
        
        const id = req.params.id;

        if (id === undefined || id === 0) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
        }
        
        connection.select('appointments.*' ).from('appointments').where('user_details_id', id).then((faltypes) => {
            if (faltypes.length > 0) {
                return res.status(200).json({ message: 'Bakım türü kullanan randevu tanımı var!', status: '400' });
            }
            else
            {
                connection.delete().from('user_details').where('id', id).then((faltypes) => {
                    return res.status(200).json({
                        status: '200',
                        message: 'Fal tipi silindi'
                    });
                });
            }
        });

    })


    app.post('/api/getUserFalTypes', async (req, res) => {
        try {
            const userid = req.body.id;
            //tanımlı fallar mı değişkeni
            var isAddedfals = req.body.isAddedfals;
            
            if (userid === undefined || userid === 0 || isAddedfals === undefined) {
                return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
            }
        
            //tüm fallar
            if (isAddedfals === 1) {
                const users = await connection
                .select('fal_types.*')
                .from('fal_types')
                return res.status(200).json(users);
            }
            else if (isAddedfals === 2) {
            //tanımlı fallar
                const users = await connection
                .select('fal_types.name')
                .select('user_details.id')
                .from('user_details')
                .join('fal_types', 'fal_types.id', 'user_details.fal_type')
                .where('user_details.user_id', userid);

                return res.status(200).json(users);
            }
            else{
            //tanımsız fallar
                const users = await connection
                .select('fal_types.*')
                .select('user_details.cost')
                .from('users')
                .join('user_details', 'user_details.user_id', 'users.id')
                .join('fal_types', 'fal_types.id', 'user_details.fal_type')
                .where('users.id', userid);
    
                if (users.length === 0) {
                    
                    const falTypes = await connection
                        .select('fal_types.*')
                        .from('fal_types');
                    return res.status(200).json(falTypes);

                }
                else{
                    //simdiki fal idisi haric olanları getiricek
                    const falids = users.map(user => user.id);
        
                    const falTypes = await connection
                        .select('fal_types.*')
                        .from('fal_types')
                        .whereNotIn('fal_types.id', falids);
            
                    return res.status(200).json(falTypes);
                }
            }
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Bir hata oluştu', status: 'error' });
        }
    });
    

    app.post('/api/getUserComments', (req, res) => {
        var userid = req.body.id;
        
        if (userid === undefined || userid === 0) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
        }
        connection.select('user_comments.*' ).from('user_comments').where('user_comments.user_id', userid).then((users) => {
            return res.status(200).json(users);
        });
    })
    
    app.post('/api/getUserFalAndAppointments', (req, res) => {
        var username = req.body.username;
        
        if (username === undefined || username === 0) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
        }
        
        connection.select('fal_types.id as fal_id').
                   select('fal_types.name as fal_name').
                   select('fal_types.created_at as fal_created_at').
                   select('fal_types.updated_at as fal_updated_at').
                   select('appointments.id as appointment_id').
                   select('appointments.created_at as appointment_created_at').
                   select('appointments.updated_at as appointment_updated_at').
                   select('appointments.user_details_id').
                   select('appointments.app_start_date').
                   select('appointments.app_end_date').
                   select('appointments.start_hour').
                   select('appointments.end_hour').
                   select('appointments.interval_time').
                   select('user_details.*').
                   select('users.username as username').
                   select('user_details.cost').
                   from('users').
                   leftJoin('user_details', 'user_details.user_id', 'users.id').
                   leftJoin('fal_types', 'fal_types.id', 'user_details.fal_type').
                   leftJoin('appointments', 'appointments.user_details_id', 'user_details.id').
                   where('users.username', username).then((users) => {
                    
                    return res.status(200).json(users);
            });
    })

    app.put('/api/updateUserFalType', (req, res) => {
        var id = req.body.id;
        var req_fal_id = req.body.faltype_id;
        var req_cost = req.body.cost;

        if (id === undefined || id === 0) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
        }   

        connection.update({ 
            fal_type: req_fal_id,
            cost: req_cost,
            updated_at: new Date()
         }).from('user_details').where('id', id).then((faltypes) => {
            return res.status(200).json({
                status: '200',
                message: 'Fal Güncellendi!'
            }); 
        });
    })


    app.post('/api/addUserAppointment', (req, res) => {
        
        var user_details_id = req.body.user_details_id;
        var app_start_date = req.body.app_start_date;
        var app_end_date = req.body.app_end_date;
        var start_hour = req.body.start_hour;
        var end_hour = req.body.end_hour;
        var interval_time = req.body.interval_time;
        
        connection.select('*').from('appointments').where('user_details_id', user_details_id).then((users) => {
            if (users.length === 0) {
                connection('appointments').insert({ 
                    user_details_id: user_details_id,
                    app_start_date: app_start_date,
                    app_end_date: app_end_date,
                    start_hour: start_hour,
                    end_hour: end_hour,
                    interval_time: interval_time,
                    created_at: new Date(),
                    updated_at: new Date()
                }).then((faltypes) => {
                    return res.status(200).json({
                        status: '200',
                        message: 'Randevu Eklendi!'
                    }); 
                });
            }
            else {
                return res.status(200).json({
                    status: '400',
                    message: 'Randevu zaten var!'
                }); 
            }
        });
    })


    app.put('/api/updateUserAppointment', (req, res) => {
        
        var user_details_id = req.body.user_details_id;
        var app_start_date = req.body.app_start_date;
        var app_end_date = req.body.app_end_date;
        var start_hour = req.body.start_hour;
        var end_hour = req.body.end_hour;
        var interval_time = req.body.interval_time;
        var new_user_details_id = req.body.new_user_details_id;

        if (user_details_id === undefined || user_details_id === 0) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
        }

        connection.update({ 
            app_start_date: app_start_date,
            app_end_date: app_end_date,
            start_hour: start_hour,
            end_hour: end_hour,
            interval_time: interval_time,
            user_details_id: new_user_details_id,
            updated_at: new Date()
         }).from('appointments').where('user_details_id', user_details_id).then((faltypes) => {
            return res.status(200).json({
                status: '200',
                message: 'Randevu Güncellendi!'
            }); 
        });
    })

    app.delete('/api/DeleteUserAppointment/:id', (req, res) => {
        const id = req.params.id;

        if (id === undefined || id === 0) {
                return res.status(200).json({ message: 'Lütfen parametreleri kontrol edin', status: '404' });
        }
            
        connection.delete().from('appointments').where('appointments.id', id).then((faltypes) => {
            return res.status(200).json({
                status: '200',
                message: 'Randevu Tanımı Silindi'
            });
        });
    }) 


    app.post('/api/getUserDetails', (req, res) => {
        var user_id = req.body.user_id;

        if (user_id === undefined || user_id === 0) {
            return res.status(200).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
        }

        connection.select('*').from('user_details').join('fal_types', 'fal_types.id', 'user_details.fal_type').where('user_id', user_id).then((users) => {
            if (users.length === 0) {
                return res.status(200).json({ message: 'Kullanıcıya ait bakım türü bulunamadı', status: '404' });
            }
            
            return res.status(200).json(users);
        });
    
    });


    app.put('/api/updateUserStatus', (req, res) => {
        var user_id = req.body.user_id;
        var status = req.body.status;

        if (user_id === undefined || user_id === 0) {
            return res.status(400).json({ message: 'Lütfen parametreleri kontrol edin', status: '404' });
        }

        connection.update({ 
            status: status
         }).from('users').where('id', user_id).then((faltypes) => {
            return res.status(200).json({
                status: '200',
                message: 'Kullanıcı Durumu Güncellendi'
            }); 
        });
    });

    app.put('/api/updateUserProfilePicture', (req, res) => {
        
        var fileBase64 = req.body.fileBase64;
        var user_id = req.body.user_id;
   
        if (user_id === undefined || user_id === 0) {
            return res.status(400).json({ message: 'Lütfen parametreleri kontrol edin', status: '404' });
        }
    
        connection.update({ 
            profile_image: fileBase64
         }).from('users').where('id', user_id).then((faltypes) => {
            return res.status(200).json({
                status: '200',
                message: 'Kullanıcı Resmi Güncellendi',
                profile_picture: fileBase64
            }); 
        });
        
    })

}
    
export default userDetails;