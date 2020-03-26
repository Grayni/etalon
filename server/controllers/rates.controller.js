const Rate = require('../models/rate.model')

module.exports.create = async (req, res) => {
  const rate = new Rate({
    title: req.body.title,
    activators: req.body.activators,
    price: req.body.price
  })

  try {
    await rate.save()
    res.status(201).json(rate)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const rates = await Rate.find()
    res.status(200).json(rates)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    await Rate.findById(req.params.id, (error, rate) => {
      res.status(200).json(rate)
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Rate.deleteOne({_id: req.params.id})
    res.status(200).json({message: 'Услуга успешно удалена!'})
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    title: req.body.title,
    activators: req.body.activators,
    price: req.body.price
  }

  try {
    const rate = await Rate.findOneAndUpdate({_id: req.params.id}, {$set}, {new: true})
    res.status(200).json(rate)
  } catch (e) {
    res.status(500).json(e)
  }
}