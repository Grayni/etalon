const Comment = require('../models/comment.model')
const Article = require('../models/article.model')

module.exports.create = async (req, res) => {
  try {
    const {name, text, articleId} = req.body
    const comment = new Comment({name, text, articleId})

    await comment.save()

    const article = await Article.findById(articleId)
    article.comments.push(comment._id)
    await article.save()

    res.status(201).json(comment) 
  } catch (e) {
    req.status(500).json(e)
  }
}