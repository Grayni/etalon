const passport = require('passport')
const {Router} = require('express')
const controller = require('../controllers/questions.controller')
const router = Router()

// Admin
// /api/questions/admin

router.post(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  controller.create
)

router.get(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  controller.getAll
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.getById
)

router.put(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.update
)

router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.remove
)

// Main
// /api/questions

router.get('/questions', controller.getAll)
router.get('/questions/:chpu', controller.getById)
router.get('/questions/:chpu', controller.addView)

module.exports = router