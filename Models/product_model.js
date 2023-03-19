const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    productImg: {
        type: Buffer,
        default: '../uploads/defaultImg.png'
    }
});

mongoose.model("ProductModel", productSchema);