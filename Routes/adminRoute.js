const express = require('express')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const { JWT_SECRET } = require('../config');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();
const AdminModel = mongoose.model('AdminModel');
const ProductModel = mongoose.model('ProductModel');

router.post('/createAdmin', (req,res) => {
    const { fullName, email, username, password } = req.body;

    // check for blank input
    if (!fullName || !email || !username || !password){
        res.status(400).json({Error: "All fields are mandatory!"});
    } else {
        bcryptjs.hash(password, 16).then((hashedPassword) => {
            const newAdmin = new AdminModel({fullName, email, username, password: hashedPassword});
            newAdmin.save().then((adminInfo) => {
                if (adminInfo){
                    res.status(200).json({Success: adminInfo});
                }
            });
        });
    }
});

router.post('/adminLogin', (req,res) => {
    const { username, password } = req.body;

    // check for blank input
    if (!username || !password){
        res.status(400).json({Error: 'All fields are mandatory!'});
    } else {
        AdminModel.findOne({ username: username }).then((userFound) => {
            if (!userFound){
                res.status(401).json({Error: "Invalid Credentials!"});
            } else {
                bcryptjs.compare(password, userFound.password).then((didMatch) => {
                    if (didMatch){
                        const jwtToken = jwt.sign({id: userFound._id}, JWT_SECRET);
                        res.status(200).json({token: jwtToken, user: userFound.fullName});
                    } else {
                        res.status(401).json("Invalid Credentials!");
                    }
                });
            }
        });
    }
});

router.post('/addProduct', verifyAdmin, (req, res) => {
    const { productName, price, stock } = req.body;

    // check for blank input
    if (!productName || !price || !stock){
        res.status(400).json("Please provide all data inputs!");
    } else {
        const newProduct = new ProductModel({productName, price, stock});
        newProduct.save().then((product) => {
            if (product){
                res.status(200).json({Product: product});
            } else {
                res.status(500).json("Error Occurred!");
            }
        });
    }
});

module.exports = router;