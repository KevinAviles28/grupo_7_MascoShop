var express = require('express');
var router = express.Router();
const path = require('path');
const {index,search, nosotros} = require(path.join('..','controllers','indexController'));


/* GET home page. */
router.get('/',index);
router.get('/search',search);
router.get('/sobreNosotros',nosotros)


module.exports = router;
