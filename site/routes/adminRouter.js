const path = require('path');
const express = require('express');
const router = express.Router();

const adminCheck= require(path.join('..','middlewares','admincheck'));

const {lista,edit,remove} = require(path.join('..','controllers','adminController'));

router.get('/lista',adminCheck,lista);
router.put('/edit/:id',edit);
router.delete('/delete/:id',remove);

module.exports = router;