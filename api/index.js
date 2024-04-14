import knex from './knex/connection.js';
const express  = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Kullanıcı adı ve sifre gereklidir' });
    }

    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ username: username }, 'admin-secret', { expiresIn: '1h' });
        return res.json({ token });
    } else if (username === 'user' && password === 'user') {
        const token = jwt.sign({ username: username }, 'user-secret', { expiresIn: '1h' });
        return res.json({ token });
    }
      

})