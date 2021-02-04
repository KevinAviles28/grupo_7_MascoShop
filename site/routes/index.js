var express = require('express');
var router = express.Router();
const {index,productCart,productAdd,productDetail}=require('../controllers/indexController');


/* GET home page. */
router.get('/',index);
router.get('/productCart',productCart);
router.get('/productAdd',productAdd)
router.get('/productDetail',productDetail)

module.exports = router;
