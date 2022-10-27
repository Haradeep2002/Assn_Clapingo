const jwt = require('jsonwebtoken')
const Student = require('../models/student')
//express middleware
const auth = async (req, res, next) => {
    try {
        console.log("here")
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const student = await Student.findOne({ _id: decoded._id, token: token })
        if (!student) {
            throw new Error('no student found')
        }
        req.token = token
        //req.auth
        req.student = student
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: e })
    }
}

module.exports = auth