const Teacher = require('../models/teacher');
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
        await Student.deleteMany({
            teacher
        })
        await teacher.remove()
        res.status(201).send("teacher removed")
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
        console.log(e);
        res.status(402).send(e)
    }
}

module.exports={create,delet,readAll}