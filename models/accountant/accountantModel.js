// models/accountant/accountantModel.js

const mongoose = require('mongoose');

const accountantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Accountant = mongoose.model('Accountant', accountantSchema);

module.exports = Accountant;