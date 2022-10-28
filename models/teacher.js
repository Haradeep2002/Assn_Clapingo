const mongoose = require('mongoose')
const validator = require('validator')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength:32,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Name cannot be empty')
            }
        }
    }
},{
    timestamps:true,
    toJSON: { virtuals: true }
})

teacherSchema.virtual('students', {
    ref: 'Student',
    localField: '_id',
    foreignField: 'favteachers'
})

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher