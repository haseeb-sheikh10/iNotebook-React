const mongoose = require('mongoose');
const { Schema } = mongoose;

// New User authentication schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('user',userSchema);
