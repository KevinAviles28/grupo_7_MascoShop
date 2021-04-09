const {check}=require('express-validator')
module.exports=[
    check('nuevaContasenia').isStrongPassword().withMessage('Escribe bien ideota')
]