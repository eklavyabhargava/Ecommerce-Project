const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;
const { MONGODB_URL } = require('./config');

mongoose.connect(MONGODB_URL);

mongoose.connection.on('connected', ()=>{console.log("Connected to database!");});
mongoose.connection.on('error', ()=>{console.log(error);});

require('./Models/admin_model');
require('./Models/product_model');

app.use(cors());
app.use(express.json());

app.use(require('./Routes/adminRoute'));

app.listen(PORT, () => {
    console.log(`Listening On Port: ${PORT}`);
});