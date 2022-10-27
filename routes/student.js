//auth.js+user.js
const express = require('express')
const {signup,signin,signout,studentById,read} = require('../controllers/student')
const auth = require('../middleware/auth')
const isAuth = require('../middleware/isAuth')
const router = new express.Router()

router.post('/signup',signup)
router.post('/signin', signin)
router.get('/signout',auth, signout)
router.get('/student/:studentId',auth,isAuth,read)

router.param("studentId",studentById)

module.exports = router
