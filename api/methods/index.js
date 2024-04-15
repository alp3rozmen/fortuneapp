import authenticateToken from "./middleware/index.js";
import connection from "../knex/connection.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
function methods(app){

var response = {
    status: '',
    message: '',
}
    
app.post('/api/login', (req, res) => {
    
    const { username, password } = req.body;

    if (username === '' || password === '') {
        response.status = 'error';
        response.message = 'Kullanıcı adı ve sifre gereklidir';
        return res.status(400).json(response);
    }

    connection.select().from('users').where('username', username).then((user) => {

        if (user.length === 0) {
            response.status = 'error';
            response.message = 'Kullanıcı adı veya sifre hatalı';
            return res.status(400).json(response);
        }
        

        const hashedPassword = user[0].password;
        bcrypt.compare(password, hashedPassword, (err, result) => {
            
            if (err || !result) { {
                response = {
                    status: 'error',
                    message: 'Kullanıcı adı veya sifre hatalı',
                }
                return res.status(400).json(response);
            }}

            const token = jwt.sign({ username: username }, 'secret', { expiresIn: '1m' });
            
            response = {
                status: 'success',
                message: 'Giris basarili',
                token: token
            }

            return res.status(200).json(response);
        })
    })
})


app.get('/api/users', authenticateToken, (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    connection.select().from('users').then((users) => {
        return res.status(200).json(users);
    })
})

app.post('/api/createfal', authenticateToken, (req, res) => {
    
    
})

}

export default methods;