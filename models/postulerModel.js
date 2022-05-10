const mongoose = require('mongoose')

const postulerSchema = mongoose.Schema(
  {
    annonce: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Annonce',
    },
    condidat: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Condidat',
    },
    reponse: {
          type:Boolean,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Postuler', postulerSchema)
