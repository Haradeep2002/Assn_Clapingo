const {Teacher} = require('../models/teacher');
const Student = require('../models/student');

const create =async (req,res) => {
    const teacher = new Teacher(req.body)
    try{
        await teacher.save()
        res.status(201).send({teacher})
    }catch(err){
        return res.status(400).send({
            error: err
        })
    }
}

const delet = async (req,res) => {
    const teacher = await Teacher.findById(req.body["id"])
    try{
        const students = await Student.find();
        for(let i=0;i<students.length;i++){
            students[i]["favteachers"] = students[i]["favteachers"].filter(function(item) {
                return item != req.body["id"]
            })
            await students[i].save()
        }
        await teacher.remove()
        res.status(200).send("teacher removed")
    }catch(err){
        return res.status(400).send({
            error: err
        })
    }
}

const readAll =async (req,res) => {
    try {
        const teacher = await Teacher.find();
        res.status(200).send(teacher)
    } catch (e) {
        res.status(400).send(e)
    }
}

const read = async (req,res) => {
    try{
        const teacher = await Teacher.findById(req.body["id"])
        res.status(200).send(teacher)
    }catch(err){
        return res.status(400).send({
            error: err
        })
    }
}

const updat = async (req,res) => {
    try{
        // console.log(req.body)
        const teacher = await Teacher.findById(req.body["id"])
        teacher["name"] = req.body["name"]
        teacher.save()
        res.status(200).send(teacher)
    }catch(err){
        return res.status(400).send({
            error: err
        })
    }
}

module.exports={create,delet,readAll,read,updat}