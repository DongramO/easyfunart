const express = require('express')

const router = express.Router()

const playlist = require('./playlist')
const review = require('./review')
const home = require('./home')
const preference = require('./preference')
const login = require('./login')
const logout =require('./logout')
const exhibition = require('./exhibition')
const mypage = require('./mypage')
const search = require('./search')
const docent = require('./docent')


router.use('/playlist', playlist)
router.use('/review', review)
router.use('/home', home)
router.use('/preference', preference)
router.use('/login', login)
router.use('/logout',logout)
router.use('/exhibition', exhibition)
router.use('/mypage', mypage)
<<<<<<< Updated upstream
router.use('/gallery', gallery)
=======
router.use('/search', search)
router.use('/docent', docent)
>>>>>>> Stashed changes

// router.use('/author', author)
module.exports = router
