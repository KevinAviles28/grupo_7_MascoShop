const { Router } = require('express');
var express = require('express');
var router = express.Router();
const {productCart,productDetail,productAdd} = require('../controllers/productsControllers');

router.get('/productCart',productCart);
router.get('/productDetail',productDetail);
router.get('/productAdd',productAdd);

module.exports = router