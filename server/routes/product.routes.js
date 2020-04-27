const passport = require('passport')
const { Router } = require('express')
const { fields } = require('../controllers/product/fields')
const { images } = require('../controllers/product/images')
const { otherImagesTitle } = require('../controllers/product/otherImagesTitle')
const { otherImages } = require('../controllers/product/otherImages')
const { getProductId } = require('../controllers/product/getProductId')
const { search } = require('../controllers/product/search')
const router = Router()

//Admin
// /api/product

router.get(
    '/get-product-search',
    search
)

router.get(
    '/get-product-id',
    getProductId
)

router.post(
    '/create/fields',
    passport.authenticate('jwt', { session: false }),
    fields
)

router.post(
    '/create/images',
    passport.authenticate('jwt', { session: false }),
    images
)

router.post(
    '/create/other-image-title',
    passport.authenticate('jwt', { session: false }),
    otherImagesTitle
)

router.post(
    '/create/other-images',
    passport.authenticate('jwt', { session: false }),
    otherImages
)


module.exports = router