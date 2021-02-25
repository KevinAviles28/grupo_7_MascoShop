var express = require('express');
var router = express.Router();
const {productCart,productDetail,productAdd,processProduct,productEdit,processEdit,productDelete,allProducts,productCategory,productSubcategory,productNav,productOfertas} = require('../controllers/productsControllers');

/* middlewares */
const upload = require('../middlewares/multerProduct');
const rutasCheck= require('../middlewares/rutasCheck');
const adminCheck= require('../middlewares/admincheck');
const productoValidation=require('../validations/productoValidation');
router.get('/productCart',productCart);

/* product register */
router.get('/productAdd',rutasCheck,adminCheck,productAdd);
router.post('/productAdd',upload.any(),productoValidation,processProduct);
/* product register */

router.get('/productDetail/:id',productDetail);/* detalle de productos segun su id */

/* product edit */
router.get('/productEdit/:id',rutasCheck,adminCheck,productEdit);
router.put('/productEdit/:id',productoValidation,processEdit);
/* product edit */

/* product delete */
router.delete('/productDelete/:id',productDelete);
/* product delete */

/* listado de productos totales, por category y subcategory */
router.get('/allProducts',rutasCheck,allProducts)
router.get('/productCategory/:category',productCategory);
router.get('/productSubcategory/:subcategory',productSubcategory);

router.get('/productNav/:category/:subcategory',productNav);
router.get('/productOfertas',productOfertas);

module.exports = router;