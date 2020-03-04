const passport = require('passport')
const {Router} = require('express')
const ctr = require('../controllers/product.controller')
const router = Router()

//Admin
// /api/city

router.post(
    '/admin/create-city',
    passport.authenticate('jwt', { session: false }),
    ctr.create
)

router.post(
    '/search-on-city',
    ctr.searchCity
)

router.post(
    '/admin/update-city',
    passport.authenticate('jwt', { session: false }),
    ctr.updateCity
)

router.delete(
    '/admin/delete-city',
    passport.authenticate('jwt', { session: false }),
    ctr.remove
)

router.get(
    '/',
    ctr.getCity
)

module.exports = router