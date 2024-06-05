// models/ceo/ceoModel.js

const mongoose = require('mongoose');

const ceoSchema = new mongoose.Schema({
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

const CEO = mongoose.model('CEO', ceoSchema);

module.exports = CEO;