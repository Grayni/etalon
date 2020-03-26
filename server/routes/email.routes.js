// const passport = require('passport')
const {Router} = require('express')
const controller = require('../controllers/email.controller')
const router = Router()

// /api/email
router.post(
  '/',
  controller.sendEmail
)

router.post(
  '/question',
  controller.sendUser
)

router.post(
  '/questionnaire',
  controller.sendQuestionnaire
)



module.exports = router