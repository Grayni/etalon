const {Schema, model} = require('mongoose')


const arrayLimit = value => value.length === 4

const rateSchema = new Schema({
  title: {
    type: String,
    reqiured: true
  },
  activators: {
    type: [Boolean],
    validate: [arrayLimit, 'Количество тарифов не соответствует действительности'],
    required: true
  },
  price: {
    type: String,
    required: true
  }
})

module.exports = model('rates', rateSchema)



