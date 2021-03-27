const {Schema, model} = require('mongoose')

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  chpu: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  keys: {
    type: Array,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comments'
    }
  ]
})

module.exports = model('articles', articleSchema)