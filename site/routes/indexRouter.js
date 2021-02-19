var express = require('express');
var router = express.Router();
const {index,search, nosotros} = require('../controllers/indexController');


/* GET home page. */
router.get('/',index);
router.get('/search',search);
router.get('/sobreNosotros',nosotros)


module.exports = router;
