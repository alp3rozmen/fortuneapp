import authenticateToken from "../middleware/index.js";

function getUserFalAndCost(app , connection) {

    app.post('/api/getUserFalAndCost', (req, res) => {
        var userid = req.body.id;
        
        if (userid === undefined || userid === 0) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
        }
        connection.select('fal_types.*' ).select('user_details.cost').from('users').join('user_details', 'user_details.user_id', 'users.id').join('fal_types', 'fal_types.id', 'user_details.fal_type').where('users.id', userid).then((users) => {
            return res.status(200).json(users);
        });
    })

    app.post('/api/getUserComments', (req, res) => {
        var userid = req.body.id;
        
        if (userid === undefined || userid === 0) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
        }
        connection.select('user_comments.*' ).from('user_comments').where('user_comments.user_id', userid).then((users) => {
            return res.status(200).json(users);
        });
    })
    
}

export default getUserFalAndCost;