import authenticateToken from "./middleware/index.js";
import connection from "../knex/connection.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path, { join } from "path";
import userDetails from "./userdetails/index.js";
import FalEndPoints from "./fals/index.js";
import { clear, Console, error } from "console";
import dayjs from 'dayjs';
import { json } from "stream/consumers";
import { start } from "repl";

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
                    user_role: user[0].user_role,
                    profile_image: user[0].profile_image,
                    email : user[0].email,
                    balance : user[0].balance
                }

                return res.status(200).json(response);
            })
        })
    })

    //TOKEN ILE CHECK
    app.post('/api/getUserInfo', authenticateToken, (req, res) => {

        const { userid } = req.body;

        if (userid === '') {
            return res.status(400).json({ error: 'Kullanıcı adı ve sifre gereklidir', status: 'error' });
        }

        connection.select().from('users').where('id', userid).then((user) => {
            if (user[0]) {
                var response = {
                    status: 'success',
                    message: 'Kullanıcı Bilgileri Alındı',
                    userid: user[0].id,
                    userName: user[0].username,
                    user_role: user[0].user_role,
                    profile_image: user[0].profile_image,
                    email: user[0].email,
                    balance: user[0].balance
                };
        
                return res.status(200).json(response);
            } else {
                return res.status(404).json({
                    status: 'error',
                    message: 'Kullanıcı bulunamadı',
                });
            }
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({
                status: 'error',
                message: 'Bir hata oluştu',
            });
        });
    })



    app.get('/api/users/:user_name', (req, res) => {
        
        var username = req.query.user_name;
        var userResponse = [];

        if (username === undefined) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });
        }
        
        connection.select('user_details.*').select('users.*').from('users').join('user_details', 'users.id', 'user_details.user_id').where('username', username).then((user) => {
            if (user.length === 0) {
                return res.status(400).json({ error: 'Kullanıcı bulunamadı', status: 'error' });
            }
            else {

                userResponse.push(
                    {   user_id: user[0].id , 
                        username: user[0].username, 
                        email: user[0].email,
                        password: user[0].password,
                        gender: user[0].gender,
                        age: user[0].age,
                        bio: user[0].bio,
                        profile_image: user[0].profile_image,    
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
 
        // const blobData = result[0].blob_column;

        if ((user_role === undefined && fortuner_type !== undefined) || (user_role === undefined && fortuner_type === undefined)) {
            return res.status(400).json({ error: 'Lütfen parametreleri kontrol edin', status: 'error' });

        }
    
        if (user_role === 0 && fortuner_type === 0 && isAdminReq === 1) {
            connection.select('users.*').select('user_details.id as user_details_id').select('user_details.fal_type').from('users').leftJoin('user_details', 'users.id', 'user_details.user_id')
            .whereNotIn('user_role', [1,3])
            .groupBy('users.id').then((users) => {
                users.map((user) => {
                    
                    userResponse.push({ id: user.id , 
                                        username: user.username, 
                                        email: user.email,
                                        password: user.password,
                                        gender: user.gender,
                                        age: user.age,
                                        bio: user.bio,
                                        profile_image: user.profile_image,
                                        user_role: user.user_role,
                                        status: user.status,
                                        balance: user.balance,
                                        created_at: user.created_at,
                                        updated_at: user.updated_at,
                                        user_details_id: user.user_details_id,
                                        fal_type: user.fal_type
                                    })
                });
                
                return res.status(200).json(
                    userResponse
                );
            });
        }
        else if (user_role === 0 && fortuner_type === 0 && isAdminReq === 0) {


            connection.select('users.*').select('user_details.id as user_details_id').select('user_details.fal_type').from('users').leftJoin('user_details', 'users.id', 'user_details.user_id')
            .whereNotNull('user_details.id')
            .groupBy('users.id').then((users) => {
                users.map((user) => {
                    userResponse.push({ id: user.id , 
                                        username: user.username, 
                                        email: user.email,
                                        password: user.password,
                                        gender: user.gender,
                                        age: user.age,
                                        bio: user.bio,
                                        profile_image: user.profile_image,
                                        user_role: user.user_role,
                                        status: user.status,
                                        balance: user.balance,
                                        created_at: user.created_at,
                                        updated_at: user.updated_at,
                                        user_details_id: user.user_details_id,
                                        fal_type: user.fal_type})
                });
              
                return res.status(200).json(
                    userResponse
                );
            });
        }
        else if (user_role > 0 && fortuner_type > 0 && isAdminReq === 0) {

            connection.select('users.*').select('user_details.id as user_details_id').select('user_details.fal_type').from('users').where('users.user_role', user_role).join('user_details', 'users.id', 'user_details.user_id').where('user_details.fal_type', fortuner_type).then((users) => {
                users.map((user) => {
                        userResponse.push({ id: user.id , 
                                            username: user.username, 
                                            email: user.email,
                                            password: user.password,
                                            gender: user.gender,
                                            age: user.age,
                                            bio: user.bio,
                                            profile_image: user.profile_image,
                                            user_role: user.user_role,
                                            status: user.status,
                                            balance: user.balance,
                                            created_at: user.created_at,
                                            updated_at: user.updated_at,
                                            user_details_id: user.user_details_id,
                                            fal_type: user.fal_type})
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
        var name = req.body.name;
        var surname = req.body.surname;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var status = 1000;
        var user_type = 1;
        var balance = 0;

        if (!username || !email || !password) {
            return res.status(200).json({ error: 'Lütfen zorunlu alanları doldurun!' });
        }

        if (password.length < 6) {
            return res.status(200).json({ error: 'Şifre en az 6 karakter olmalıdır!' });
        }

        connection.select().from('users').where('username', username).orWhere('email', email).then((users) => {
            if (users.length > 0) {
                return res.status(200).json({ error: 'Kullanıcı adı ya da e-posta zaten kayıtlı!' });
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
                    return res.status(400).json({ error: 'Bir hata meydana geldi!' });
                });
            }
        }).catch((err) => {
            console.error(err);
            return res.status(400).json({ error: 'Bir hata meydana geldi!' });
        });
    });

    userDetails(app, connection);


    app.post('/api/getAppointment', async (req, res) => {
        // userid userdetail tablosunun idsi
        const { userid , faltype , pselectedDate } = req.body;
       
        if (!userid) {
            return res.status(400).json({ error: 'Lütfen zorunlu alanları doldurun!' });
        }
        var hoursList = [];
        connection.raw("SELECT ap.id as app_id, ap.start_hour, ap.end_hour, ud.*, GetUserAppointments(?, ?) AS hoursList from user_details ud join appointments ap on ap.user_details_id = ud.id where ud.id = ?", [userid, dayjs(pselectedDate).format('DD.MM.YYYY'), userid])
        .then((result) => {
            hoursList = result[0][0].hoursList.split(',');
            if (hoursList.length == 0) {
                hoursList = null;
            }
            var userDetails = {
                app_id: result[0][0].app_id,
                user_id: result[0][0].user_id,
                fal_type: result[0][0].fal_type,
                start_hour: result[0][0].start_hour,
                end_hour: result[0][0].end_hour,
                
            };
            return res.status(200).json({hours : hoursList , app_details: userDetails });
        })
        .catch((err) => {
            console.error('Error fetching taken appointments:', err);
        });

    })

    app.post('/api/getZodiacs',authenticateToken, (req, res) => {
        connection.select().from('zodiac_signs').then((zodiacs) => {
            if (zodiacs.length > 0) {
                return res.status(200).json({data : zodiacs, statusCode : 200});
            }
            else {
                return res.status(400).json({ error: 'Bir hata meydana geldi!' });
            }
        })
    }
    )

    app.post('/api/addNewSignComment',authenticateToken, (req, res) => {
        connection.select().from('zodiac_signs_comments').where('zodiac_sign_id', req.body.signId).andWhere('created_at', req.body.date).then((comments) => {
            if (comments.length > 0) {
                return res.status(200).json({ message: 'Bu tarih için yorum zaten var!' , statusCode : 404 });
            }
            else {
                connection('zodiac_signs_comments').insert({
                    zodiac_sign_id: req.body.signId,
                    comment: req.body.dailyComment,
                    commentlove: req.body.loveComment,
                    commentwork: req.body.careerComment,
                    commenthealth: req.body.healthComment,
                    created_at: req.body.date
                }).then((result) => {
                    if (result) {
                        return res.status(200).json({ message: 'Yorum eklendi!' , statusCode : 200 });
                    }
                    else {
                        return res.status(400).json({ message: 'Bir hata meydana geldi!' , statusCode : 404 });
                    }
                }).catch((err) => {
                    console.log(err);
                    return res.status(400).json({ message: 'Bir hata meydana geldi!'  , statusCode : 404 });
                })
            }
        }
        ).catch((err) => {
            console.log(err);
            return res.status(400).json({ message: 'Bir hata meydana geldi!' });
        })
    }
    )

    app.post('/api/getSignComments',authenticateToken, (req, res) => {
        connection.select('zodiac_signs_comments.*', 'zodiac_signs.name').from('zodiac_signs_comments')
            .join('zodiac_signs', 'zodiac_signs.id', 'zodiac_signs_comments.zodiac_sign_id')
            .where('zodiac_sign_id', req.body.signId).then((comments) => {
            if (comments.length > 0) {
                return res.status(200).json({data : comments, statusCode : 200});
            }
            else if (comments.length == 0) {
                return res.status(200).json({data : comments, statusCode : 404});
            }
            else {
                return res.status(400).json({ error: 'Bir hata meydana geldi!' });
            }
        })
    }
    )

    app.post('/api/deleteSignComment',authenticateToken, (req, res) => {
        connection('zodiac_signs_comments').where('id', req.body.commentId).del().then((result) => {
            if (result) {
                return res.status(200).json({ statusCode : 200,message: 'Yorum silindi!' });
            }
            else {
                return res.status(400).json({statusCode : 400, message: 'Bir hata meydana geldi!' });
            }
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({ message: 'Bir hata meydana geldi!' });
        })
    }
    )
    
    // UPDATE SIGN COMMENT
    app.post('/api/updateSignComment', authenticateToken, (req, res) => {
        
        connection('zodiac_signs_comments')
        .where('id', req.body.commentId)
        .update({
        comment: req.body.dailyComment,
        commentlove: req.body.loveComment,
        commentwork: req.body.careerComment,
        commenthealth: req.body.healthComment
    }
        ).then((result) => {
            return res.status(200).json({ statusCode: 200, message: 'Yorum güncellendi!' });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({ statusCode: 400, message: 'Bir hata meydana geldi!' });
        });
    });


    app.post('/api/getZodiacSignInfo', (req, res) => {
        connection.select().from('zodiac_signs')
            .join('zodiac_signs_comments', 'zodiac_signs.id', 'zodiac_signs_comments.zodiac_sign_id')
            .where('zodiac_signs.id', req.body.id).andWhere('zodiac_signs_comments.created_at', req.body.date).then((sign) => {
            if (sign.length > 0) {
                return res.status(200).json({data : sign, statusCode : 200});
            }
            else if (sign.length == 0) {
                return res.status(200).json({data : sign, statusCode : 404});
            }
            else {
                return res.status(400).json({ error: 'Bir hata meydana geldi!' });
            }
        })
    }
    )



    FalEndPoints(app , connection);
}


export default methods;