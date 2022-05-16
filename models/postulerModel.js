const mongoose = require("mongoose");

const postulerSchema = mongoose.Schema({
    annonce: {
        type: String,
        required: true,
        ref: "Annonce",
    },
    condidat: {
        type: String,
        required: true,
        ref: "Condidat",
    },
    reponse: {
        type: String,
    },
    diplome: {
        type: String,
    },
    exp: {
        type: Number,
    },
    moyfe: {
        type: Number,
    },
    datedep: {
        type: Date,
    },
    datenaissance: {
        type: Date,
    },
    tel: {
        type: String,
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    cin: {
        type: String,
    },
    email: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Postuler", postulerSchema);