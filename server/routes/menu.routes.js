const { Router } = require('express')
const passport = require('passport')
const { create } = require('../controllers/menu/create')
const { edit } = require('../controllers/menu/edit')
const { remove } = require('../controllers/menu/remove')
const { get } = require('../controllers/menu/get')
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
    get
)


module.exports = router