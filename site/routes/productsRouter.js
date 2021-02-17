var express = require('express');
var router = express.Router();
const {productCart,productDetail,productAdd,processProduct,productEdit,processEdit,productDelete,allProducts,productCategory,productSubcategory,productNav,productOfertas} = require('../controllers/productsControllers');

/* middlewares */
const upload = require('../middlewares/multer');

router.get('/productCart',productCart);

/* product register */
router.get('/productAdd',productAdd);
router.post('/productAdd',upload.any(),processProduct);
/* product register */

router.get('/productDetail/:id',productDetail);/* detalle de productos segun su id */

/* product edit */
router.get('/productEdit/:id',productEdit);
router.put('/productEdit/:id',processEdit);
/* product edit */

/* product delete */
router.delete('/productDelete/:id',productDelete);
/* product delete */

/* listado de productos totales, por category y subcategory */
router.get('/allProducts',allProducts)
router.get('/productCategory/:category',productCategory);
router.get('/productSubcategory/:subcategory',productSubcategory);

router.get('/productNav/:category/:subcategory',productNav);
router.get('/productOfertas',productOfertas);

module.exports = router;