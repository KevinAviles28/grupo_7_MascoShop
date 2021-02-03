var express = require('express');
var router = express.Router();
const {index,carrito,product}=require('../controllers/indexController');


/* GET home page. */
router.get('/',index);
router.get('/productCart',carrito);
router.get('/productAdd',product)

module.exports = router;
