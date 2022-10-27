const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Name cannot be empty')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password is not secure')
            }
        }
    },
    //this field is real
    //fav teacher
    teacher: {
        //ObjectID
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //reference of other collection to create a link between both 
        ref: 'Teacher'
    },
    token: {
        type: String
    }
},{
    timestamps:true
})

studentSchema.methods.toJSON = function () {
    const student = this
    const studentObject = student.toObject()

    delete studentObject.password
    delete studentObject.token

    return studentObject
}

studentSchema.methods.generateAuthToken = async function () {
    const student = this
    const token = jwt.sign({ _id: student._id.toString() }, process.env.JWT_SECRET)
    student.token = token
    await student.save()

    return token
}

studentSchema.statics.findByCredentials = async (email, password) => {
    const student = await Student.findOne({ email })

    if (!student) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, student.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return student
}

studentSchema.pre('save', async function (next) {
    const student = this

    if (student.isModified('password')) {
        student.password = await bcrypt.hash(student.password, 8)
    }

    next()
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student