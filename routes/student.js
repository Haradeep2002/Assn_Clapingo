const express = require('express')
const {signup,signin,signout,studentById,read,addfav,remfav,delet,update} = require('../controllers/student')
const auth = require('../middleware/auth')
const isTeacher = require('../middleware/isTeacher')
const isAuth = require('../middleware/isAuth')
const router = new express.Router()

router.post('/signup',signup)
router.post('/signin', signin)
router.get('/signout',auth, signout)
router.get('/student/:studentId',auth,isAuth,read)
router.post('/addfav',auth,isTeacher, addfav)
router.delete('/remfav',auth,isTeacher, remfav)
router.delete('/delete',auth,delet)
router.patch('/student/:studentId',auth,isAuth,update)

router.param("studentId",studentById)

module.exports = router
