module.exports = (req,res,next) => {
    if(req.session.userNew){
        next()
    }else{
        res.redirect('/users/login')
    }
}