const {Router} = require('express')
const passport = require('passport')
const {create, getMenu} = require('../controllers/menu.controller')
const router = Router()

// /api/menu/
router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    create
)

router.get(
    '/',
    getMenu
)


module.exports = router