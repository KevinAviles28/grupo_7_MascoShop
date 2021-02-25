module.exports = (req,res,next) => {
    if(req.session.userNew.category==="Admin"){
        next()
    }else{
        res.redirect('/')
    }
}