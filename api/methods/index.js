import authenticateToken from "./middleware/index.js";
import connection from "../knex/connection.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from "path";
import { error } from "console";
function methods(app) {

    async function insertFals(user_id) {
        try {
            const [fal_id] = await connection('fals').insert({
                user_id: user_id,
                created_at: new Date(),
                updated_at: new Date()
            });
    
            return fal_id;
        } catch (err) {
            console.error('Fal oluşturulurken hata oluştu:', err);
            return 0; // Hata durumunda 0 döndür
        }
    }
    

    app.post('/api/login', (req, res) => {

        const { username, password } = req.body;

        if (username === '' || password === '') {
            return res.status(400).json({ error: 'Kullanıcı adı ve sifre gereklidir', status: 'error' });
        }

        connection.select().from('users').where('username', username).orWhere('email', username).then((user) => {

            if (user.length === 0) {
                return res.status(400).json({ error: 'Kullanıcı adı veya sifre hatalı', status: 'error' });
            }


            const hashedPassword = user[0].password;
            bcrypt.compare(password, hashedPassword, (err, result) => {

                if (err || !result) {
                    {
                        return res.status(400).json({ error: 'Kullanıcı adı veya sifre hatalı', status: 'error' });
                    }
                }

                const token = jwt.sign({ username: username }, 'secret', { expiresIn: '24h' });

                var response = {
                    status: 'success',
                    message: 'Giris basarili',
                    token: token,
                    userid : user[0].id,
                    userName : user[0].username
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

    app.post('/api/createfal', authenticateToken, async (req, res) => {

        var userid = req.body.userid;
        var fal_id = 0;


        if ((userid > 0) &&
            (req.body.gender !== undefined || req.body.gender !== null || req.body.gender !== '') &&
            (req.body.age !== undefined || req.body.age !== null || req.body.age !== '') &&
            (req.body.status !== undefined || req.body.status !== null || req.body.status !== '') &&
            (req.body.city !== undefined || req.body.city !== null || req.body.city !== '') &&
            (req.body.country !== undefined || req.body.country !== null || req.body.country !== '') &&
            (req.body.type !== undefined || req.body.type !== null || req.body.type !== '') &&
            (req.body.image1 !== undefined || req.body.image1 !== null || req.body.image1 !== '') &&
            (req.body.image2 !== undefined || req.body.image2 !== null || req.body.image2 !== '') &&
            (req.body.image3 !== undefined || req.body.image3 !== null || req.body.image3 !== '') &&
            (req.body.comment !== undefined || req.body.comment !== null || req.body.comment !== '')) {

            fal_id = await insertFals(userid);

            if (fal_id > 0) {

                var image1 = Buffer.from(req.body.image1, 'base64');
                var image2 = Buffer.from(req.body.image2, 'base64');
                var image3 = Buffer.from(req.body.image3, 'base64');


                fs.mkdirSync('./images/' + req.body.userid, { recursive: true });
                fs.mkdirSync('./images/' + req.body.userid  + '/' + fal_id, { recursive: true });

                var newPath1 = path.join('./images/' + req.body.userid + '/' + fal_id, 'image1.jpg');
                var newPath2 = path.join('./images/' + req.body.userid + '/' + fal_id, 'image2.jpg');
                var newPath3 = path.join('./images/' + req.body.userid + '/' + fal_id, 'image3.jpg');

                var file1 = fs.writeFileSync(newPath1, image1);
                var file2 = fs.writeFileSync(newPath2, image2);
                var file3 = fs.writeFileSync(newPath3, image3);

                connection('fal_details').insert({
                    fal_id: fal_id,
                    gender: req.body.gender,
                    age: req.body.age,
                    status: 1000,
                    city: req.body.city,
                    country: req.body.country,
                    type: req.body.type,
                    image1_url: newPath1,
                    image2_url: newPath2,
                    image3_url: newPath3,
                    comment: '',
                }).then((result) => {

                    if (result) {
                        return res.status(200).json({ message: 'Fal kaydedildi!'  });
                    }
                    else {
                        return res.status(400).json({ message: 'Bir hata meydana geldi!' });
                    }
                }).catch((err) => {
                    console.log(err);
                    return res.status(400).json({ message: 'Bir hata meydana geldi!' });
                })


            }
            else {
                return res.status(400).json({ message: 'Bir hata meydana geldi!' });
            }


        }
        else {
            return res.status(400).json({ error: 'Lütfen Zorunlu alanları doldurun!' });
        }


    })

    app.post('/api/register', (req, res) => {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var status = 1000;
        var user_type = 1;
        var balance = 0;
    
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Lütfen zorunlu alanları doldurun!' });
        }
    
        if (password.length < 6) {
            return res.status(400).json({ error: 'Şifre en az 6 karakter olmalıdır!' });
        }
    
        connection.select().from('users').where('username', username).orWhere('email', email).then((users) => {
            if (users.length > 0) {
                return res.status(400).json({ error: 'Kullanıcı adı ya da e-posta zaten kayıtlı!' });
            } else {
                connection('users').insert({
                    username: username,
                    email: email,
                    password: bcrypt.hashSync(password, 10),
                    user_role: user_type,
                    status: status,
                    balance: balance
                }).then(() => {
                    return res.status(200).json({ message: 'Kayıt Başarılı!' });
                }).catch((err) => {
                    console.error(err);
                    return res.status(400).json({ message: 'Bir hata meydana geldi!' });
                });
            }
        }).catch((err) => {
            console.error(err);
            return res.status(400).json({ message: 'Bir hata meydana geldi!' });
        });
    });

}
    

export default methods;