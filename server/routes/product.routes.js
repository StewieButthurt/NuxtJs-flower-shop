const passport = require('passport')
const {Router} = require('express')
const ctr = require('../controllers/product.controller')
const router = Router()

//Admin
// /api/product

router.get(
    '/get-product-id',
    ctr.getProductId
)

router.post(
    '/create/fields',
    passport.authenticate('jwt', { session: false }),
    ctr.fields
)

router.post(
    '/create/images',
    passport.authenticate('jwt', { session: false }),
    ctr.images
)

router.post(
    '/create/other-image-title',
    passport.authenticate('jwt', { session: false }),
    ctr.otherImagesTitle
)

router.post(
    '/create/other-images',
    passport.authenticate('jwt', { session: false }),
    ctr.otherImages
)

// router.post(
//     '/create',
//     passport.authenticate('jwt', { session: false }),
//     ctr.create
// )

// router.post(
//     '/search-on-city',
//     ctr.searchCity
// )

// router.post(
//     '/admin/update-city',
//     passport.authenticate('jwt', { session: false }),
//     ctr.updateCity
// )

// router.delete(
//     '/admin/delete-city',
//     passport.authenticate('jwt', { session: false }),
//     ctr.remove
// )

// router.get(
//     '/',
//     ctr.getCity
// )

module.exports = router