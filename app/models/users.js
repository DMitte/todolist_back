const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    phone: {
        type: Number,
        required: true,
        minLength: 8,
        maxLength: 10
    },
    date: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)