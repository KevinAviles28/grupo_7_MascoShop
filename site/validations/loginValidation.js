const {check}=require('express-validator');

module.exports=[ /* esto es una array que va a estar chequeando si todo es correcto */
  
  
  check('emailLog').isEmail().withMessage('El campo Email tiene que ser un email valido'),
  
  
  check('pass')
  .notEmpty().withMessage('La contraseña es requerida'),
  
]