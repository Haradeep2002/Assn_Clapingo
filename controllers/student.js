const Student = require('../models/student')
const Teacher = require('../models/teacher')


const signup =async (req,res) => {
    const student = new Student(req.body)
    try{
        await student.save()
        const token = await student.generateAuthToken()
        res.status(201).send({ student, token })
    }catch(err){
        console.log(err)
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
            error:"cant find teacher"
        })
    }
}

const delet = async (req,res) => {
    const student = await Student.findById(req.student["id"])
    try{
        await student.remove()
        res.status(200).send("student removed")
    }catch(err){
        return res.status(400).send({
            error: err
        })
    }
}

const update = async (req, res) => {
    const updates = Object.keys(req.body)

    const allowedUpdates = ['name', 'password']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.profile[update] = req.body[update])
        await req.profile.save()
        res.send(req.profile)
    } catch (e) {
        res.status(400).send(e)
    }
}

const favorite = async (req,res) => {
    try{
        const teachers = await Teacher.find();
        let mx = 0, fav = null;
        for(let teacher of teachers){
            let docs = await Student.aggregate([
                { 
                    $match: {
                        "favteachers": {
                            "$in": [teacher["_id"]]
                        }
                    } 
                }
            ]);
            if(docs.length>mx){
                mx=docs.length;
                fav=teacher;
            }
        }
        res.status(200).send({ fav_teacher: fav })
    }catch(e){
        res.status(401).send(e)
    }
}


module.exports = {
    signup,signin,signout,studentById,read,addfav,remfav,delet,update,favorite
}