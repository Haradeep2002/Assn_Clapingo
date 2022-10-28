const Teacher = require('../models/teacher')
const isTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findOne({ _id: req.body["id"] })
        if (!teacher) {
            throw new Error('no teacher found')
        }
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: e })
    }
}

module.exports = isTeacher