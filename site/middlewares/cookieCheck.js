module.exports = (req,res,next) => {
    if(req.cookies.recordar){
        req.session.userNew = req.cookies.recordar
    }
    next()
}