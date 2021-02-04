var express = require('express');
var router = express.Router();
const {index,productCart,productAdd,productDetail,register,login}=require('../controllers/indexController');


/* GET home page. */
router.get('/',index);
router.get('/productCart',productCart);
router.get('/productAdd',productAdd)
router.get('/productDetail',productDetail)
router.get('/register',register)
router.get('/login',login)

module.exports = router;
