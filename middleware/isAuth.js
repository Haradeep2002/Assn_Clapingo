//use in combination with auth.js
//currently authenticated user
const isAuth = (req,res,next) => {
    // console.log(req.profile)
    // console.log(req.user)
    // console.log(req.profile._id==req.user._id)
    let student = req.profile && req.student &&  req.profile._id.equals(req.student._id);
    if(!student){
        return res.status(403).json({
            error:"Access denied"
        })
    }
    next()
}

module.exports = isAuth