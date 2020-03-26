const Question = require('../models/question.model')

module.exports.create = async (req, res) => {
  const question = new Question({
    section: req.body.section,
    question: req.body.question,
    chpu: req.body.chpu,
    answer: req.body.answer,
  })

  try {
    await question.save()
    // 201 create new data
    res.status(201).json(question)
  } catch (e) {
    // 500 - status server error!
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const questions = await Question.find()
    // 200 - status answer good!
    res.status(200).json(questions)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    await Question.findById(req.params.id, (error, question) => {
      res.status(200).json(question)
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getByChpu = async (req, res) => {
  try {
    await Question.find({chpu: req.params.chpu}, (error, question) => {
      res.status(200).json(question[0])
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    section: req.body.section,
    question: req.body.question,
    answer: req.body.answer
  }
  try {
    const question = await Question.findOneAndUpdate({
      _id: req.params.id
    }, {$set}, {new: true})

    res.status(200).json(question)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Question.deleteOne({_id: req.params.id})
    res.status(200).json({message: 'Вопрос успешно удален!'})
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.addViewQuestion = async (req, res) => {
  const $set = {
    views: req.body.views
  }
  try {
    await Question.findOneAndUpdate({
      _id: req.params.id
    }, {$set})
    // 204 - контента нет, но все успешно
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}