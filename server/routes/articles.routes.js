const passport = require('passport')
const {Router} = require('express')
const upload = require('../middleware/upload')
const controller = require('../controllers/articles.controller')
const router = Router()


// Admin
// /api/articles/admin

router.post(
  '/admin',
  passport.authenticate('jwt', {session: false}),
  upload.single('image'),
  controller.create
)

router.post(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }),
  controller.remove
)

router.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  controller.getAll
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', { session: false}),
  controller.getById
)

router.put(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.update
)

router.put(
  '/admin/image/:id',
  passport.authenticate('jwt', {session: false}),
  upload.single('image'),
  controller.updateWidthImage
)

router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  controller.remove
)

router.get(
  '/admin/get/analytics',
  passport.authenticate('jwt', { session: false }),
  controller.getAnalytics
)

// Main
// /api/articles

router.get('/', controller.getAll)
router.get('/:chpu', controller.getByChpu)
router.put('/add/view/:id', controller.addView)

module.exports = router
