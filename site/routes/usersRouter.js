var express = require('express');
var router = express.Router();
const path = require('path');
const {register, login, processRegister, perfil, processLogin, cerrarSession, eliminarCuenta, editarPerfilEscencial, editaVistaEscencial, vistaDeEdicion, edicionDePerfil,} = require(path.join('..','controllers','usersControllers'));

/* middlewares */
const registerValidation=require(path.join('..','validations','registerValidation'));
const loginValidation=require(path.join('..','validations','loginValidation'));

const upload = require(path.join('..','middlewares','multerUser'));
const rutasCheck=require(path.join('..','middlewares','rutasCheck'));

/* register */
router.get('/register',register);
router.post('/register',upload.any(),registerValidation,processRegister);


/* login */
router.get('/login',login);
router.post('/login',loginValidation,processLogin);


/* Perfil */
router.get('/perfil/:id',rutasCheck,perfil);

/* editar perfil escencial*/
router.get('/editEscencial',rutasCheck,editaVistaEscencial);
router.put('/editEscencial/:id',editarPerfilEscencial);

/* editar perfil normal*/
router.get('/edit',rutasCheck,vistaDeEdicion);
router.put('/edit/:id',edicionDePerfil);

/* eliminar cuenta */
router.delete('/delete/:id',eliminarCuenta);


/* cerrar session */
router.get('/logout',cerrarSession);


module.exports = router;
