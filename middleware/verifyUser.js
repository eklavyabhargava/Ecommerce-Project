const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const mongoose = require('mongoose');
const UserModel = mongoose.model('UserModel');

module.exports = ((req, res, next) => {
    const { authorization } = req.headers;

    // check if authorization token
    if (!authorization){
        return res.status(400).json({Error: "Not Logged In. Please Login Again!"});
    } else {
        // get token from authorization key
        const token = authorization.replace("Bearer ", "");
        
        // verify token using jwt.verify
        jwt.verify(token, JWT_SECRET, (error, id) => {
            if (error){
                return res.status(400).json({Error: "Invalid Credentials!"});
            } else {
                UserModel.findById(id).then((userFound) => {
                    req.user = userFound;
                    next();
                });
            }
        });
    }
});