const path = require('path');
const express = require('express');
const router = express.Router();

const adminCheck= require(path.join('..','middlewares','admincheck'));
const rutasCheck= require(path.join('..','middlewares','rutasCheck'));
const upload = require(path.join('..','middlewares','multerProduct'));
const productoValidation=require(path.join('..','validations','productoValidation'));

const {lista,edit,remove,listaProducts,productEdit,processEdit,productDelete} = require(path.join('..','controllers','adminController'));

router.get('/lista',adminCheck,lista);
router.put('/edit/:id',edit);
router.delete('/delete/:id',remove);

router.get('/listaProducts',adminCheck,listaProducts);
/* product edit */
router.get('/productEdit/:id',rutasCheck,adminCheck,productEdit);
router.put('/productEdit/:id',upload.any(),productoValidation,processEdit);
/* product edit */

/* product delete */
router.delete('/productDelete/:id',productDelete);
/* product delete */

module.exports = router;