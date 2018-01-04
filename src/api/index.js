const express = require('express')

const router = express.Router()

const playlist = require('./playlist')
const reviews = require('./reviews')
const home = require('./home')
const preference = require('./preference')
const login = require('./login')

router.use('/palylist', playlist)
router.use('/review', reviews)
router.use('/home', home)
router.use('/preference', preference)
router.use('/login', login)

module.exports = router
