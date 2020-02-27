const passport = require('passport')
const {Router} = require('express')
const ctr = require('../controllers/form.controller')
const router = Router()

//Admin
// /api/form

router.post(
    '/',
    ctr.newApplication
)


module.exports = router