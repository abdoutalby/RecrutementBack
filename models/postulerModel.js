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
}, {
    timestamps: true,
});

module.exports = mongoose.model("Postuler", postulerSchema);