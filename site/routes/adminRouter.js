const path = require('path');
const express = require('express');
const router = express.Router();

const {lista,edit,remove} = require(path.join('..','controllers','adminController'));

router.get('/lista',lista);
router.put('/edit/:id',edit);
router.delete('/delete/:id',remove);

module.exports = router;