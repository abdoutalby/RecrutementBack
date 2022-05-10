const mongoose = require("mongoose");

const recruterSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    status: {
        type: Boolean,
        required: [true, "Please add a status"],
    },
    adress: {
        type: String,
        required: [true, "Please add adress "],
    },
    tel: {
        type: String,
        required: [true, "please add a phone number "],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Recruter", recruterSchema);