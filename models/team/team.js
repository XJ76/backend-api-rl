const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    employeeID: {
        type: String,
        required: true
    },
    workStation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    nationalID: {
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

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;