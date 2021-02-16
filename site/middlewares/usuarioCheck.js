module.exports = (req,res,next)=>{
    if(req.session.userNew){/* si esta levantado sesion */
        
        res.locals.userNew = req.session.userNew/* poneme en locals user lo que esta req.session user */
        
    }
    next()
}
/* middleWare a nivel de aplicacion */