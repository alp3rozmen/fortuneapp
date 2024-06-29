import authenticateToken from "./middleware/index.js";
import connection from "../knex/connection.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from "path";
import userDetails from "./userdetails/index.js";
import FalEndPoints from "./fals/index.js";
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
                    userid: user[0].id,
                    userName: user[0].username,
                    user_role: user[0].user_role
                }

                return res.status(200).json(response);
            })
        })
    })

    app.get('/api/users/:user_name', (req, res) => {
        var username = req.query.user_name;
        var userResponse = [];
        var profileImageData = null; 
        var base64Image = null;

        if (username === undefined) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
        }
        
        connection.select('user_details.*').select('users.*').from('users').join('user_details', 'users.id', 'user_details.user_id').where('username', username).then((user) => {
            if (user.length === 0) {
                return res.status(400).json({ error: 'Kullanıcı bulunamadı', status: 'error' });
            }
            else {

                profileImageData = user[0].profile_image; 
                base64Image =  Buffer.from(profileImageData).toString('base64');
                var profileImageUrl = `data:image/jpeg;base64,${base64Image}`;
                
                userResponse.push(
                    {   user_id: user[0].id , 
                        username: user[0].username, 
                        email: user[0].email,
                        password: user[0].password,
                        gender: user[0].gender,
                        age: user[0].age,
                        bio: user[0].bio,
                        profile_image: profileImageUrl,
                        user_role: user[0].user_role,
                        status: user[0].status,
                        balance: user[0].balance
                    }
                );

                return res.status(200).json(userResponse);
            }
        });
    })

    app.post('/api/users', (req, res) => {

        var user_role = req.body.user_role;
        var fortuner_type = req.body.fortuner_type;
        var isAdminReq = req.body.isAdmin;
        var userResponse = [];
        var profileImageData = null; 
        var base64Image = null;
        
        // const blobData = result[0].blob_column;

        if ((user_role === undefined && fortuner_type !== undefined) || (user_role === undefined && fortuner_type === undefined)) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });

        }

    
        if (user_role === 0 && fortuner_type === 0 && isAdminReq === 1) {
            connection.select('users.*').select('user_details.id as user_details_id').from('users').leftJoin('user_details', 'users.id', 'user_details.user_id')
            .whereNotIn('user_role', [1,3])
            .groupBy('users.id').then((users) => {
                users.map((user) => {
                profileImageData = user.profile_image;
                base64Image =  Buffer.from(profileImageData).toString('base64');
                var profileImageUrl = `data:image/jpeg;base64,${base64Image}`;

                    userResponse.push({ id: user.id , 
                                        username: user.username, 
                                        email: user.email,
                                        password: user.password,
                                        gender: user.gender,
                                        age: user.age,
                                        bio: user.bio,
                                        profile_image: profileImageUrl,
                                        user_role: user.user_role,
                                        status: user.status,
                                        balance: user.balance,
                                        created_at: user.created_at,
                                        updated_at: user.updated_at,
                                        user_details_id: user.user_details_id})
                });
                
                return res.status(200).json(
                    userResponse
                );
            });
        }
        else if (user_role === 0 && fortuner_type === 0 && isAdminReq === 0) {
            connection.select('users.*').select('user_details.id as user_details_id').from('users').leftJoin('user_details', 'users.id', 'user_details.user_id')
            .whereNotNull('user_details.id')
            .groupBy('users.id').then((users) => {
                users.map((user) => {
                profileImageData = user.profile_image;
                base64Image =  Buffer.from(profileImageData).toString('base64');
                var profileImageUrl = `data:image/jpeg;base64,${base64Image}`;

                    userResponse.push({ id: user.id , 
                                        username: user.username, 
                                        email: user.email,
                                        password: user.password,
                                        gender: user.gender,
                                        age: user.age,
                                        bio: user.bio,
                                        profile_image: profileImageUrl,
                                        user_role: user.user_role,
                                        status: user.status,
                                        balance: user.balance,
                                        created_at: user.created_at,
                                        updated_at: user.updated_at,
                                        user_details_id: user.user_details_id})
                });
                
                return res.status(200).json(
                    userResponse
                );
            });
        }
        else if (user_role > 0 && fortuner_type > 0 && isAdminReq === 0) {

            connection.select('users.*').select('user_details.id as user_details_id').from('users').where('users.user_role', user_role).join('user_details', 'users.id', 'user_details.user_id').where('user_details.fal_type', fortuner_type).then((users) => {
                users.map((user) => {
                    profileImageData = user.profile_image;
                    base64Image =  Buffer.from(profileImageData).toString('base64');
                    var profileImageUrl = `data:image/jpeg;base64,${base64Image}`;
    
                        userResponse.push({ id: user.id , 
                                            username: user.username, 
                                            email: user.email,
                                            password: user.password,
                                            gender: user.gender,
                                            age: user.age,
                                            bio: user.bio,
                                            profile_image: profileImageUrl,
                                            user_role: user.user_role,
                                            status: user.status,
                                            balance: user.balance,
                                            created_at: user.created_at,
                                            updated_at: user.updated_at,
                                            user_details_id: user.user_details_id})
                    });
                    
                    return res.status(200).json(
                        userResponse
                    );
            });
        }
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
                fs.mkdirSync('./images/' + req.body.userid + '/' + fal_id, { recursive: true });

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
                        return res.status(200).json({ message: 'Fal kaydedildi!' });
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

    userDetails(app, connection);


    app.post('/api/getAppointment', (req, res) => {
        // userid userdetail tablosunun idsi
        const { userid } = req.body;
        
        if (!userid) {
            return res.status(400).json({ error: 'Lütfen zorunlu alanları doldurun!' });
        }

        
            connection.select('appointments.*').select('user_details.*')
            .from('user_details')
            .join('appointments', 'appointments.user_details_id', 'user_details.id')
            .where('user_details.id' , userid)
            .then((user) => {
            if (user.length === 0) {
                return res.status(200).json({ message: 'Randevu bulunamadı!' , status : 'error' });
            }
            return res.status(200).json(user);
            })
            .catch((err) => {
            console.error('Error:', err);
            return res.status(500).json({ message: 'Sunucu hatası!' });
            });
        
    });

    FalEndPoints(app , connection);

}


export default methods;