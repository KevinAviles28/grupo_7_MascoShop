const fs=require('fs');
const {check,body}=require('express-validator')
const users_db = JSON.parse(fs.readFileSync('./data/users.json','utf-8'))
module.exports=[
    check('name').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    check('apellido').isAlpha().withMessage('El campo "apellido" es obligatorio'),
    check('email').isEmail().withMessage('El campo Email tiene que ser un email valido'),
    body('email').custom(value =>{/* checkea si el email ya esta registrado */
        let result= users_db.find(user => user.email === value);
        if(result){/* si return es igual a true */
            return false
        }else{
            return true
        }
    }).withMessage('El email ya esta registrado'),

    check('passUno').isLength({
        min:6,
        max:12
    }).withMessage('La contraseña deben tener un Minimo 6 maximo 12 caracteres'),

    /*como el pass2 no la trae la base de datos la chekea del body*/
    body('passDos').custom((value,{req})=>{ /* custom= para validar?*/  /* el req siempre es un objeto literal */
        if(value!==req.body.passUno){/*si el valor del pass2 es ditinto al la contra primera contraseña*/
            return false;
        }else{
            return true;
        }
        
    }).withMessage('Las contraseñas no coinciden, intentelo de nuevo')



]