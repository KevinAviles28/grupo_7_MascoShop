var express = require('express');
var router = express.Router();
const path = require('path');

const {index,search, nosotros,mediosDePago,sucursales} = require(path.join('..','controllers','indexController'));

router.get('/',index);
router.get('/search',search);
router.get('/sobreNosotros',nosotros);
router.get('/mediosDePago',mediosDePago);
router.get('/sucursales',sucursales);

module.exports = router;
