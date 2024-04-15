import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {        
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'secret', (err, user) => {
        if (err) {
            return res.status(403).json({ error: err.message });            
        }
        if (!user || user.username !== '') {
          next();
        }else
        {
          return res.status(401).json({ error: 'Unauthorized' });
        }
    })
}

export default authenticateToken;