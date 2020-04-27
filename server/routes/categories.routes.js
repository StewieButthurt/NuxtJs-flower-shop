const { Router } = require('express')
const passport = require('passport')
const { create } = require('../controllers/categories/create')
const { get } = require('../controllers/categories/get')
const { edit } = require('../controllers/categories/edit')
const { remove } = require('../controllers/categories/remove')
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