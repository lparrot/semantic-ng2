const mongoose = require('mongoose');
const crypto = require('crypto');

const schema = new mongoose.Schema({
    email: String,
    password: String,
    lastname: String,
    firstname: String,
    job: String,
    avatar: String,
    address: String,
    birthday: String,
    connectionFailure: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    deleted: Date
});

schema.index({
    email: 'text',
    lastname: 'text',
    firstname: 'text',
    job: 'text'
});

mongoose.model('User', schema);