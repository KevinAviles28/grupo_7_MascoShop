var express = require('express');
var router = express.Router();
const {register,login, processRegister, perfil, processLogin, cerrarSession, eliminarCuenta, editaVista, editarPerfil} = require('../controllers/usersControllers');

/* middlewares */
const registerValidation=require('../validations/registerValidation');
const loginValidation=require('../validations/loginValidation');

const upload = require('../middlewares/multerUser');


/* register */
router.get('/register',register);
router.post('/register',upload.any(),registerValidation,processRegister);


/* login */
router.get('/login',login);
router.post('/login',loginValidation,processLogin) ;


/* Perfil */
router.get('/perfil',perfil);

/* editar perfil */
router.get('/edit',editaVista);
router.put('/edit/:id',editarPerfil);

/* eliminar cuenta */
router.delete('/delete/:id',eliminarCuenta);


/* cerrar session */
router.get('/logout',cerrarSession)

module.exports = router;
