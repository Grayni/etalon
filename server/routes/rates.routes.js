const passport = require('passport')
const {Router} = require('express')
const controller = require('../controllers/rates.controller')
const router = Router()

// Admin
// /api/rates/admin

router.get(
  '/admin',
  passport.authenticate('jwt', {session: false}),
  controller.getAll
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.getById
)

router.post(
  '/admin',
  passport.authenticate('jwt', {session: false}),
  controller.create
)

router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.remove
)

router.put(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.update
)




// Main
// /api/rates

router.get('/', controller.getAll)


module.exports = router