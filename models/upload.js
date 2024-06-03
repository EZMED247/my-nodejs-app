const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
    imageLink: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userAddress: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('upload', uploadSchema)