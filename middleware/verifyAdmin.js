const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const mongoose = require('mongoose');
const AdminModel = mongoose.model('AdminModel');

module.exports = ((req, res, next) => {
    const { authorization } = req.headers;

    // check if authorizaiton key available or not
    if (!authorization) {
        return res.status(400).json({ Error: "Not Logged In. Please Login Again!" });
    } else {
        // extract token from authorization key
        const token = authorization.replace("Bearer ", "");
        // verify token using jwt.verify function
        jwt.verify(token, JWT_SECRET, (error, id) => {
            if (error) {
                return res.status(400).json({ Error: "Invalid Credentials!" });
            } else {
                AdminModel.findById(id).then((userFound) => {
                    req.user = userFound;
                    next();
                });
            }
        });
    }
});