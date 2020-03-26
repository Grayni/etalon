const passport = require('passport')
const {Router} = require('express')
const controller = require('../controllers/tables.controller')
const router = Router()

// Admin
// /api/tables/admin

router.post(
  '/admin/create/table',
  passport.authenticate('jwt', {session: false}),
  controller.create
)

router.get(
  '/admin',
  passport.authenticate('jwt', {session: false}),
  controller.getAll
)

router.get(
  '/admin/:name',
  passport.authenticate('jwt', {session: false}),
  controller.getByName
)

router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.remove
)

router.post(
  '/admin/row',
  passport.authenticate('jwt', {session: false}),
  controller.rowAdd
)

router.put(
  '/admin/row/:uid',
  passport.authenticate('jwt', {session: false}),
  controller.rowUpdate
)

router.put(
  '/admin/:name',
  passport.authenticate('jwt', {session: false}),
  controller.present
)

module.exports = router

// Main
// /api/tables

router.get('/', controller.getAllTables)