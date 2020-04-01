const {Router} = require('express')
const passport = require('passport')
const {getCategories} = require('../controllers/categoriesWithImage.controller')
const router = Router()

// /api/categories/
// router.post(
//     '/create',
//     passport.authenticate('jwt', { session: false }),
//     create
// )

// router.post(
//     '/edit',
//     passport.authenticate('jwt', { session: false }),
//     edit
// )

// router.delete(
//     '/delete',
//     passport.authenticate('jwt', { session: false }),
//     remove
// )

router.get(
    '/',
    getCategories
)


module.exports = router