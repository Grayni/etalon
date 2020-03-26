const {Schema, model} = require('mongoose')

const questionSchema = new Schema({
  section: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  chpu: {
    type: String,
    required: true,
    unique: true
  },
  answer: {
    type: String,
    requred: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  }
})

module.exports = model('questions', questionSchema)