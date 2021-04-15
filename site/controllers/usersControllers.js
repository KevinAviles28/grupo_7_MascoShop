const path = require('path');
const fs = require('fs');
const db = require(path.join('..','database','models'));
const bcrypt = require('bcrypt')  
const {validationResult} = require('express-validator');
const nodemailer=require('nodemailer');




/* cambio().catch(console.error); */

module.exports = {
    processRegister:(req,res)=>{
        
        
        const errores=validationResult(req);
        
        if(!errores.isEmpty()){
            if(req.files[0]){
                fs.unlinkSync('public/images/users/'+req.files[0].filename)
            }
            return res.render('users/login',{
                errores : errores.mapped(),/* convierte el valor del array en el valor de errors */
                old:req.body,/* para que se guarden los datos que escribiste */
                
            })
        }else{
            
            const {name,apellido,email,passUno,avatar,img} = req.body;    
            db.User.create({
                name: name.trim(),
                apellido: apellido.trim(),
                email: email.trim(),
                pass: bcrypt.hashSync(passUno,12),
                avatar: /* (req.files[0])?req.files[0].filename:"usuarioDefault.png" */img,
                category: 'User'
            })
            .then(()=>{
                res.redirect('/users/login');
            })
            .catch(error => console.log(error))
        }
    },
    login:(req,res)=>{
        db.ImagenPredefinada.findAll()
        .then(imagenes=>{
            res.render('users/login',{
                imagenes
            });
        })
        
    },
    processLogin:(req,res)=>{
        
        const errores=validationResult(req);
        
        if(!errores.isEmpty()){
            return res.render('users/login',{
                errores : errores.mapped(),/* convierte el valor del array en el valor de errors */
                old:req.body
            })
            
        }else{
            
            const {emailLog,pass,recordarme} = req.body;
            
            db.User.findOne({
                where: {
                    email: emailLog
                }
            })
            .then(result=>{
                
                if(result){
                    if(bcrypt.compareSync(pass,result.pass)){
                        
                        req.session.userNew={      
                            id: result.id,
                            username: result.name,
                            apellido: result.apellido,
                            email: result.email,
                            category: result.category,
                            avatar: result.avatar
                        }
                        
                        if(recordarme){
                            res.cookie("recordar",req.session.userNew,{
                                maxAge : 1000 * 60 * 60
                            })
                        }
                        
                        return res.redirect('/');
                        
                    }else{
                        return res.render('users/login',{error: 'Credenciales invalidas'});
                    }
                }else{
                    return res.render('users/login',{error: 'Credenciales invalidas'});
                }
            })
            .catch(error => console.log(error))
        }
        
    },
    perfil:(req,res)=>{
        
        db.User.findByPk(req.params.id)
        .then(usuario=>{
            res.render('users/perfil',{usuario});
        })
        
    },
    vistaDeEdicion:(req,res)=>{
        db.User.findByPk(req.params.id)
        .then(result=>{
            /* res.send(result) */
            res.render('users/editPerfil',{
                result
            });
        })
        
    },
    edicionDePerfil:(req,res)=>{
        
        const {provincia,localidad,telefono,direccion} = req.body;
        
        db.User.update({
            provincia: provincia.trim(),
            localidad: localidad.trim(),
            telefono: telefono.trim(),
            direccion: direccion.trim()
        },{
            where:{
                id:req.params.id
            }
        })
        .then(()=>{
            res.redirect(`/users/perfil/${req.params.id}`);
        })
        .catch(error => console.log(error))
        
    },
    eliminarCuenta:(req,res)=>{
        db.User.findByPk(req.params.id)
        .then(user=>{
            if(user.avatar!='usuarioDefault.png'){
                fs.unlinkSync('public/images/users/'+user.avatar)
            }
        })
        db.User.destroy({
            where:{
                id:req.params.id
            }
        })
        .then(()=>{
            req.session.destroy();
            if(req.cookies.recordar){
                res.cookie('recordar','',{
                    maxAge:-1
                })
            }
            return res.redirect('/');
        })
       
    },
    cerrarSession:(req,res)=>{ /* cerrar sesion */
        req.session.destroy();
        if(req.cookies.recordar){
            res.cookie('recordar','',{
                maxAge : -1
            })
        }
        res.redirect('/')
    },
    vistaRecuperacionContraseña:(req,res)=>{
        res.render('users/recuperarContra')
    },
    recuperacionContraseña:/* async */(req,res)=>{
        const errores=validationResult(req);
        if(!errores.isEmpty()){
            /* res.send(req.body) */
            return res.render('users/recuperarContra',{
                errores : errores.mapped(),/* convierte el valor del array en el valor de errors */
                old:req.body
                
            })
        }else{
           /*  res.send(req.body) */
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                  user:process.env.EMAIL , // generated ethereal user
                  pass: process.env.PASS, // generated ethereal password
                },
                tls:{
                    rejectUnauthorized:false
                }
              });
    
            db.User.findOne({
                where:{
                    email:req.body.emailRecuperacion
                }
            }).then(async function(result){
                let verificationLink=`http://localhost:3000/users/nuevaContrasenia/${result.id}`;
                /* cambio(result,verificationLink) */
                
                  const info =await transporter.sendMail({
                        from: '"Mascoshop" <mascoshopdevelop@gmail.com>', // sender address
                        to: `${result.email}`, // list of receivers
                        subject: 'Recuperacion de contraseña', // Subject line
                        html: `<h1>Recuperacion de tu contraseña</h1>
                         <br>
                         <p>Si tu nombre de usuario no es ${result.name}, no tienes que hacer nada </p>
                         <p>Para recuperar la contraseaña haga click en este link </p>
                         <a href="${verificationLink}">Recuperar Contraseña</a>`
                      });
                      console.log(info.messageID)
                
                res.render('users/emailEnviado',{

                });
            }).catch(console.error);
        }

        
        
    },
    vistaCambioContraseña:(req,res)=>{
        db.User.findByPk(req.params.id)
        .then(result=>{
            /* res.send(result) */
            res.render(`users/cambioContraseña`,{
                result
            });
        })
    },
    cambioContraseña:(req,res)=>{
        const errores=validationResult(req);

       if(!errores.isEmpty()){
           db.User.findByPk(req.params.id)
           .then((result)=>{
            return res.render('users/cambioContraseña',{
                errores : errores.mapped(),/* convierte el valor del array en el valor de errors */
                old:req.body,
                result
            })
           })
        
       } else{
        const {nuevaContasenia}=req.body
        let haseo=bcrypt.hashSync(nuevaContasenia,12)
          db.User.update({
            pass:haseo
        },{
            where:{
                id:req.params.id
            }
        })
        .then((result)=>{
              res.redirect('/users/login')
        })
       }
     
    },
    cambioImagen:(req,res)=>{
        if(!req.files[0]){
            db.User.findByPk(req.params.id)
            .then((result)=>{
                return res.render('users/editPerfil',{
                    result
                })
            })
        }else{
            db.User.findByPk(req.params.id)
            .then((user)=>{
                if(user.avatar != 'usuarioDefault.png') {
                    fs.unlinkSync('public/images/users/' + user.avatar)
                }
            })
    
            db.User.update({
                avatar: req.files[0].filename
            },{
                where:{
                    id: req.params.id
                }
            })
            .then(()=>{
                res.redirect(`/users/perfil/${req.params.id}`)
            })
        }
        
    }
}

