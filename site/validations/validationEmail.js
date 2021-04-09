const {check,body}=require('express-validator')
const path=require('path')
const db = require(path.join('..','database','models'));
module.exports=[
    check('emailRecuperacion').notEmpty().withMessage('El campo esta vacio'),
    check('emailRecuperacion').isEmail().withMessage('El campo del Email debe de ser un email valido'),

    body('emailRecuperacion').custom(value=>{
       return  db.User.findOne({
            where:{
                email:value
            }
        }).then((resultado)=>{
            if(!resultado){
                return Promise.reject('El mail no esta registrado')
            }
        }) 
    })
]