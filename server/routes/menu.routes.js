const {Router} = require('express')
const passport = require('passport')
const {create, getMenu, edit, remove} = require('../controllers/menu.controller')
const router = Router()

// /api/menu/
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

router.delete(
    '/delete',
    passport.authenticate('jwt', { session: false }),
    remove
)

router.get(
    '/',
    getMenu
)


module.exports = router