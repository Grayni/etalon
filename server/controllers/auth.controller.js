const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login})

  if (candidate) {
    const isPassCorrect = bcrypt.compareSync(req.body.pass, candidate.pass)

    if (isPassCorrect) {
      const token = jwt.sign({
        login: candidate.login,
        userId: candidate._id
      }, keys.JWT, {expiresIn: 60 * 60})
      res.status(200).json({token})
    } else {
      res.status(401).json({message: 'Пользователь или Пароль неверный'})
    }

  } else {
    res.status(401).json({message: 'Пользователь или Пароль неверный'})
  }
}

module.exports.createUser = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login})

  if (candidate) {
    res.status(409).json({message: 'Данный логин уже занят'})
  } else {
    const salt = bcrypt.genSaltSync(10)
    
    const user = new User({
      login: req.body.login,
      pass: bcrypt.hashSync(req.body.pass, salt)
    })

    await user.save()
    res.status(201).json(user)
  }
}