var express = require('express');
var router = express.Router();
const path = require('path');

const {productCart,productDetail,productAdd,processProduct,allProducts,productCategory,productSubcategory,productNav,productOfertas,productsStock,cambiarStock} = require(path.join('..','controllers','productsControllers'));

/* middlewares */
const upload = require(path.join('..','middlewares','multerProduct'));
const rutasCheck= require(path.join('..','middlewares','rutasCheck'));
const adminCheck= require(path.join('..','middlewares','admincheck'));
const productoValidation=require(path.join('..','validations','productoValidation'));
const stockValidatior=require(path.join('..','validations','stockValidation'))
router.get('/productCart',productCart);

/* product register */
router.get('/productAdd',rutasCheck,adminCheck,productAdd);
router.post('/productAdd',upload.any(),productoValidation,processProduct);
/* product register */

router.get('/productDetail/:id',productDetail);/* detalle de productos segun su id */

/* listado de productos totales, por category y subcategory */
router.get('/allProducts',allProducts)
router.get('/productCategory/:category',productCategory);
router.get('/productSubcategory/:subcategory',productSubcategory);

router.get('/productNav/:category/:subcategory',productNav);
router.get('/productOfertas',productOfertas);
router.get('/productStock',adminCheck,productsStock);

router.put('/cambiarStock/:id',adminCheck,stockValidatior,cambiarStock)

module.exports = router;