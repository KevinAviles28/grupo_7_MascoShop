const {check,body} = require('express-validator');

module.exports = [
    check('busqueda').notEmpty()
]