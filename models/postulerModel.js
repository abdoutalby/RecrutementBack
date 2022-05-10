const mongoose = require("mongoose");

const postulerSchema = mongoose.Schema({
    annonce: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Annonce",
    },
    condidat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Condidat",
    },
    reponse: {
        type: Boolean,
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
}, {
    timestamps: true,
});

module.exports = mongoose.model("Postuler", postulerSchema);