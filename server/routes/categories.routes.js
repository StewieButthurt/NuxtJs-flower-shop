const {Router} = require('express')
const passport = require('passport')
const {create, getCategories, edit} = require('../controllers/categories.controller')
const router = Router()

// /api/categories/
router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    create
)

router.post(
    '/edit',
    passport.authenticate('jwt', { session: false }),
    edit
)

router.get(
    '/',
    getCategories
)


module.exports = router