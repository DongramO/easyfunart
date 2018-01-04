const express = require('express')

const router = express.Router()

const playlist = require('./playlist')
const review = require('./review')
const home = require('./home')
const preference = require('./preference')
const login = require('./login')
const exhibition = require('./exhibition')


router.use('/playlist', playlist)
router.use('/review', review)
router.use('/home', home)
router.use('/preference', preference)
router.use('/login', login)
router.use('/exhibition', exhibition)

module.exports = router
