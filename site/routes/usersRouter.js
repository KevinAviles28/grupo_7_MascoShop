var express = require('express');
var router = express.Router();
const {register,login, processRegister, perfil, processLogin, cerrarSession, eliminarCuenta, editarPerfilEscencial, editaVistaEscencial, vistaDeEdicion, edicionDePerfil} = require('../controllers/usersControllers');

/* middlewares */
const registerValidation=require('../validations/registerValidation');
const loginValidation=require('../validations/loginValidation');

const upload = require('../middlewares/multerUser');
const rutasCheck=require('../middlewares/rutasCheck')

/* register */
router.get('/register',register);
router.post('/register',upload.any(),registerValidation,processRegister);


/* login */
router.get('/login',login);
router.post('/login',loginValidation,processLogin) ;


/* Perfil */
router.get('/perfil',rutasCheck,perfil);

/* editar perfil escencial*/
router.get('/editEscencial',rutasCheck,editaVistaEscencial);
router.put('/editEscencial/:id',editarPerfilEscencial);

/* editar perfil normal*/
router.get('/edit',rutasCheck,vistaDeEdicion);
router.put('/edit/:id',edicionDePerfil);

/* eliminar cuenta */
router.delete('/delete/:id',eliminarCuenta);


/* cerrar session */
router.get('/logout',cerrarSession)

module.exports = router;
