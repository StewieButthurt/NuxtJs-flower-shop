const passport = require('passport')
const { Router } = require('express')
const { fields } = require('../controllers/product/fields')
const { images } = require('../controllers/product/images')
const { otherImagesTitle } = require('../controllers/product/otherImagesTitle')
const { otherImages } = require('../controllers/product/otherImages')
const { getProductId } = require('../controllers/product/getProductId')
const { search } = require('../controllers/product/search')
const router = Router()
const rateLimit = require("express-rate-limit");

const AuthLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 min
    max: 100, // start blocking after 5 requests
    message: "Too many authorization attempts, try again in an 5 min"
});

//Admin
// /api/product

router.get(
    '/get-product-search',
    AuthLimiter,
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