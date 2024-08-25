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
       
        var fal_type_id = req.body.fal_type_id;
        var form_data = req.body.form_data;
        console.log('test');
        if (fal_type_id === undefined || fal_type_id === 0) {
            return res.status(200).json({ message: 'Bakım türü id gereklidir', status: 'error' });
        }
        else if (form_data === undefined || form_data === 0 || form_data === '') {   
            return res.status(200).json({ message: 'Form verisi gereklidir', status: 'error' });
        }
        else
        {
            connection.insert({ 
                formdata: form_data,
                fal_type: fal_type_id,
                created_at : new Date(),
                updated_at : new Date()
            }).into('fal_type_design').then((faltypes) => {
                return res.status(200).json({
                    status: '200',
                    message: 'Form verisi eklendi'
                });
            });
        }
    })

}

export default FalEndPoints;