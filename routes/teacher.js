const express = require('express')
const router = express.Router()
const {create,delet,readAll} = require("../controllers/teacher")

router.post("/teacher/create",create)
router.delete('/teacher/delete',delet)
router.get('/teachers',readAll)

module.exports =router