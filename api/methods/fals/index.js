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

}

export default FalEndPoints;