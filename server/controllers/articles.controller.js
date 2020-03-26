const Article = require('../models/article.model')
const remover = require('../middleware/remove')

module.exports.create = async (req, res) => {
  const article = new Article({
    title: req.body.title,
    chpu: req.body.chpu,
    description: req.body.description,
    text: req.body.text,
    imageUrl: `/${req.file.filename}`
  })

  try {
    await article.save()
    res.status(201).json(article)
  } catch (e) {
    res.status(500).json(e)
  }
  
}

module.exports.getAll = async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 })
    res.status(200).json(articles)
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    await Article.findById(req.params.id).populate('comments').exec((error, article) => {
      res.status(200).json(article)
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getByChpu = async (req, res) => {
  try {
    await Article.find({chpu: req.params.chpu}).populate('comments').exec((error, article) => {
      res.status(200).json(article[0])
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    title: req.body.title,
    description: req.body.description,
    text: req.body.text,
    date: req.body.date
  }
  try {
    const article = await Article.findOneAndUpdate({
      _id: req.params.id
    }, {$set}, {new: true})

    res.status(200).json(article)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateWidthImage = async (req, res) => {
  // create set with image-data
  const $set = {
    title: req.body.title,
    description: req.body.description,
    text: req.body.text,
    date: req.body.date,
    imageUrl: `/${req.file.filename}`
  }
  try {
    // remove old image in storage
    const articleOld = await Article.findById(req.params.id)
    const articleName = articleOld.imageUrl
    remover(articleName)
    
    const article = await Article.findOneAndUpdate({
      _id: req.params.id
    }, {$set}, {new: true})

    res.status(200).json(article)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    // remove image in storage
    const article = await Article.findById(req.params.id)
    const articleName = article.imageUrl
    remover(articleName)

    await Article.deleteOne({_id: req.params.id})
    res.status(200).json({message: 'Статья успешно удалена!'})
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.addView = async (req, res) => {
  const $set = {
    views: req.body.views
  }
  try {
    await Article.findOneAndUpdate({_id: req.params.id}, {$set})
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAnalytics = async (req, res) => {
  try {
    const articles = await Article.find()

    const labels = articles.map(article => article.title)

    const json = {
      comments: {
        labels,
        data: articles.map(article => article.comments.length)
      },
      views: {
        labels,
        data: articles.map(article => article.views)
      }
    }

    res.json(json)
  } catch (e) {
    res.status(500).json(e)
  }
}