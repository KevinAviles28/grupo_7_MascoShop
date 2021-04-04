const {check,body}=require('express-validator')
const path=require('path')
const db = require(path.join('..','database','models'));


module.exports = [
    
    check('name').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    check('name').isLength({
        min:2
    }).withMessage('El campo debe tener al menos 2 caracteres'),    
    check('apellido').notEmpty().withMessage('El campo "apellido" es obligatorio'),
    check('apellido').isLength({
        min:2
    }).withMessage('El campo debe tener al menos 2 caracteres'),

    
    check('email').isEmail().withMessage('El campo Email tiene que ser un email valido'),

    body('email').custom(value=>{
       return  db.User.findOne({
            where:{
                email:value
            }
        }).then((resultado)=>{
            if(resultado){
                return Promise.reject('El email ya esta registrado')
            }
        }) 
    }), 
  
    check('passUno').isStrongPassword().withMessage('La contraseña debe de tener al menos 8 caracteres,una mayuscula,una minuscula,un número y un símbolo'),
   
    body('passDos').custom((value,{req})=>{ 
        if(value!==req.body.passUno){/*si el valor del pass2 es ditinto a la primera contraseña*/
            return false;
        }else{
            return true;
        }
        
    }).withMessage('Las contraseñas no coinciden, intentelo de nuevo')
    
]