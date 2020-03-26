const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')

const authRoutes = require('./routes/auth.routes')
const articlesRoutes = require('./routes/articles.routes')
const questionsRoutes = require('./routes/questions.routes')
const commentsRoutes = require('./routes/comment.routes')
const ratesRoutes = require('./routes/rates.routes')
const tablesRoutes = require('./routes/tables.routes')
const emailRoutes = require('./routes/email.routes')

const keys = require('./keys')
const app = express()

mongoose.set('useCreateIndex', true) //  useUnifiedTopology: true
mongoose.set('useFindAndModify', false)

mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected...'))
.catch(error => console.log(error))

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api/auth', authRoutes)
app.use('/api/articles', articlesRoutes)
app.use('/api/questions', questionsRoutes)
app.use('/api/comment', commentsRoutes)
app.use('/api/rates', ratesRoutes)
app.use('/api/tables', tablesRoutes)
app.use('/api/email', emailRoutes)

module.exports = app
