const mongoose = require('mongoose')

const condidatSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    adress: {
        type: String,
        required: [true, 'Please add an adress']
    },
    tel: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    active: {
        type: Boolean,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Condidat', condidatSchema)