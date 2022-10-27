const isAuth = (req,res,next) => {
    let student = req.profile && req.student &&  req.profile._id.equals(req.student._id);
    if(!student){
        return res.status(403).json({
            error:"Access denied"
        })
    }
    next()
}

module.exports = isAuth