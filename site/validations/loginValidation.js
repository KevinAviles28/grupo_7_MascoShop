const fs=require('fs');
const {check,body}=require('express-validator')
const users_db = JSON.parse(fs.readFileSync('./data/users.json','utf-8'))
const bcrypt=require('bcrypt');

module.exports=[ /* esto es una array que va a estar chequeando si todo es correcto */
  
  
  check('email').isEmail().withMessage('El campo Email tiene que ser un email valido'),
  body('email').custom(value =>{/* checkea si el email ingresado es un email ya registrado */
    let result= users_db.find(user => user.email === value);
    if(result){
        return true
    }else{
        return false
    }
}).withMessage('Tiene que ser un email registrado'),


  check('pass')
  .notEmpty().withMessage('La contraseña es requerida'),

 /*  body('pass').custom((value,{req})=>{
    let result=users_db.find(user=>user.email===req.params.email);
    if(result){
      if(bcrypt.compareSync(value.trim(),result.pass)){
        return true
      }else{
        return false
      }
    }
  }).withMessage('Contraseña invalida') */
  
  
]