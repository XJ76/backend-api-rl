const mongoose = require('mongoose');

const requisitionSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    }
},{
    timestamps: true
});

const Requisition = mongoose.model('Requisition', requisitionSchema);

module.exports = Requisition;