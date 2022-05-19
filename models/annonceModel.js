const mongoose = require("mongoose");

const annonceSchema = mongoose.Schema({
    recruter: {
        required: true,
        type: String,
    },
    specialite: {
        type: String,
        required: [true, "Please add a specialite"],
    },
    title: {
        type: String,
        required: [true, "Please add a title"],
    },
    salary: {
        type: Number,
        required: [true, "please add salary "],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Annonce", annonceSchema);