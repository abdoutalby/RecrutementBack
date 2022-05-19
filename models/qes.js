const mongoose = require("mongoose");

const qesSchema = mongoose.Schema({
    postulation: {
        required: true,
        type: String,
    },
    q1: {
        type: String,
    },
    q2: {
        type: String,
    },
    q3: {
        type: String,
    },
    q4: {
        type: String,
    },
    q5: {
        type: String,
    },
    q6: {
        type: String,
    },
    q7: {
        type: String,
    },
    q8: {
        type: String,
    },
    q9: {
        type: String,
    },
    q10: {
        type: String,
    },
    q11: {
        type: String,
    },
    q12: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Qes", qesSchema);