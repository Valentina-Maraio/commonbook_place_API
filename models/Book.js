const mongoose = require('mongoose');

const BookShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authorOne: {
        type: String,
        required: true
    },
    authorTwo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    ownedCopies: {
        type: Number,
        required: false
    },
    language: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Book', BookShema)