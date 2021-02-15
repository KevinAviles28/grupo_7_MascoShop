var express = require('express');
var router = express.Router();
const {productCart,productDetail,productAdd,processProduct,productEdit,processEdit,productDelete,allProducts} = require('../controllers/productsControllers');

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

/* product delete */

router.get('/allProducts',allProducts)/* listado de productos */

module.exports = router