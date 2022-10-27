const Student = require('../models/student')

const signup =async (req,res) => {
    const student = new Student(req.body)
    try{
        await student.save()
        const token = await student.generateAuthToken()
        res.status(201).send({ student, token })
    }catch(err){
        return res.status(400).json({
            error: err
        })
    }
}  

const signin =async (req, res) => {
    try {
        const student = await Student.findByCredentials(req.body.email, req.body.password)
        const token = await student.generateAuthToken()
        res.status(200).send({ student, token })
    } catch (e) {
        return res.status(401).json({
            error: e
        })
    }
}

const signout =async (req, res) => {
    try {
        req.student.token = null
        await req.student.save()
        res.send()
    } catch (e) {
        res.status(500).json({e})
    }
}

const studentById = async (req,res,next,id) => {
    try{
        const student = await Student.findById(id).populate("favteachers")
        if(!student){
            throw new Error("student not found")
        }
        req.profile=student
        next()
    }catch(e){
        return res.status(400).json({
            error:e
        })
    }
}

const read = (req,res) =>{
    res.json(req.profile)
}

const addfav = async (req,res) => {
    try{
        for (let i = 0; i < req.student["favteachers"].length; i++) {
            if(req.student["favteachers"][i]==req.body["id"]){
                throw new Error('teacher already favorite')
            }
        }
        req.student["favteachers"].push(req.body["id"])
        await req.student.save()
        res.status(200).send(req.student)
    }catch(e){
        return res.status(400).json({
            error:e
        })
    }
}

const remfav = async (req,res) => {
    try{
        req.student["favteachers"] = req.student["favteachers"].filter(function(item) {
            return item != req.body["id"]
        })
        await req.student.save()
        res.status(200).send(req.student)
    }catch(e){  
        return res.status(400).json({
            error:e
        })
    }
}


module.exports = {
    signup,signin,signout,studentById,read,addfav,remfav
}