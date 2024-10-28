const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const jwtPass = process.env.JWT_SECRET

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log('Authorization Header:', req.header('Authorization'));

    if(!token) {
        return res.status(401).json({
            message: 'No token, authorization denied'
        });
    }

    try {
        const decoded = jwt.verify(token, jwtPass);
        req.user = decoded.userId;
        next();
    } catch(err){
        res.status(401).json({
            message: 'Token is not valid'
        });
    }
};

module.exports = auth;