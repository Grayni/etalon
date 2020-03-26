const {model, Schema} = require('mongoose')

const rowSchema = new Schema({
  uid: {
    type: String,
    unique: true,
    required: true
  },
  operations: {
    type: String,
    required: true
  },
  usn_6: {
    type: String
  },
  usn_7: {
    type: String
  },
  osn: {
    type: String
  },
  tableId: {
    ref: 'tables',
    type: Schema.Types.ObjectId
  }
})

module.exports = model('rows', rowSchema)