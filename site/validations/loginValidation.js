const fs=require('fs');
const {check,body}=require('express-validator')
const users_db = JSON.parse(fs.readFileSync('./data/users.json','utf-8'))
const bcrypt=require('bcrypt');

module.exports=[ /* esto es una array que va a estar chequeando si todo es correcto */
  
  
  check('email').isEmail().withMessage('El campo Email tiene que ser un email valido'),


  check('pass')
  .notEmpty().withMessage('La contraseña es requerida'),

 
  
]