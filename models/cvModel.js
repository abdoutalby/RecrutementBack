const mongoose = require('mongoose') 

const cvSchema =mongoose.Schema({


    condidat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Condidat',
      },
    name: {
        type: String,
        required: [true, 'Please add a name'],
      },
      email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
      },
      niveau: {
        type: String,
        required: [true, 'Please add a niveau'],
      },
      adress: {
        type : String , 
        required: [true , 'Please add an adress']
      },
      tel: {
        type: String,
        required : [true , 'Please add a phone number']
      },
      langues: {
        type: String,
        required : [true , 'Please add langues']
      },
      formation: {
        type: String,
        required : [true , 'Please add formation']
      },
      diplome: {
        type: String,
        required : [true , 'Please add diplome']
      },
      experience: {
        type: String,
        required : [true , 'Please add experience']
      },
    },
    {
      timestamps: true,
    }

) 
module.exports = mongoose.model('CV ', cvSchema)
