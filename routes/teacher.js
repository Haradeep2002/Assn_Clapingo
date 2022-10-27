const express = require('express')
const router = express.Router()
const {create,delet,readAll,read,updat} = require("../controllers/teacher")

router.post("/teacher",create)
router.delete('/teacher',delet)
router.get('/teacher',read)
router.patch('/teacher',updat)
router.get('/teachers',readAll)

module.exports =router