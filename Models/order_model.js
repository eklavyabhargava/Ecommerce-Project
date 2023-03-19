const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: "ProductModel"
    },

    userId: {
        type: ObjectId,
        ref: "UserModel"
    },

    quantity: {
        type: Number,
        required: true
    },

    totalamt: {
        type: Number,
        required: true
    }
});

mongoose.model("OrderModel", orderSchema);