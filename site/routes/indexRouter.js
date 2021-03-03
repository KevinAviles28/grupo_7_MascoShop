var express = require('express');
var router = express.Router();
const path = require('path');
const {index,search, nosotros,contacto,mediosDePago,sucursales} = require(path.join('..','controllers','indexController'));


/* GET home page. */
router.get('/',index);
router.get('/search',search);
router.get('/sobreNosotros',nosotros);
router.get('/contacto',contacto);
router.get('/mediosDePago',mediosDePago);
router.get('/sucursales',sucursales);


module.exports = router;
