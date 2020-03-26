const {model, Schema} = require('mongoose')

const tableSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  rows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'rows'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  present: {
    type: Boolean,
    required: true
  }
})

module.exports = model('tables', tableSchema)