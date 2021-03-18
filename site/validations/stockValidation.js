const {check}=require('express-validator')

module.exports=[
    check('stock').notEmpty().withMessage('Debe tener un stock mayor a 0')
   
]