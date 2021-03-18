const path = require('path');
const fs = require('fs');
const db = require(path.join('..','database','models'));
const bcrypt = require('bcrypt')  
const {validationResult} = require('express-validator');

module.exports = {
    register:(req,res)=>{
        res.render('users/register');
    },
    processRegister:(req,res)=>{
        
        const errores=validationResult(req);
        
        if(!errores.isEmpty()){
            return res.render('users/register',{
                errores : errores.mapped(),/* convierte el valor del array en el valor de errors */
                old:req.body,/* para que se guarden los datos que escribiste */
            })
        }else{
            
            const {name,apellido,email,passUno,avatar} = req.body;
            
            db.User.create({
                name: name.trim(),
                apellido: apellido.trim(),
                email: email.trim(),
                pass: bcrypt.hashSync(passUno,12),
                avatar: (req.files[0])?req.files[0].filename:"usuarioDefoult.png",
                category: 'Admin'
            })
            .then(()=>{
                res.redirect('/users/login');
            })
            .catch(error => console.log(error))
        }
    },
    login:(req,res)=>{
        res.render('users/login');
    },
    processLogin:(req,res)=>{
        
        const errores=validationResult(req);
        
        if(!errores.isEmpty()){
            return res.render('users/login',{
                errores : errores.mapped(),/* convierte el valor del array en el valor de errors */
                old:req.body
            })
            
        }else{
            
            const {email,pass,recordarme} = req.body;
            
            db.User.findOne({
                where: {
                    email
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
                        return res.render('users/login',{error: 'Credenciales invalidas 2'});
                    }
                }else{
                    return res.render('users/login',{error: 'Credenciales invalidas 1'});
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
        .then((result)=>{
            res.render('users/editPerfil',{
                result
            });
        })
        
    },
    edicionDePerfil:(req,res)=>{

        const {pais,localidad,telefono,direccion} = req.body;
        db.User.update({
            pais: pais.trim(),
            localidad: localidad.trim(),
            telefono: telefono.trim(),
            direccion: direccion.trim()
        },{
            where:{
                id:req.params.id
            }
        })
        .then(()=>{
            res.redirect('/');
        })
        .catch(error => console.log(error))
    
    },
    eliminarCuenta:(req,res)=>{
        
        let user = db.User.findByPk(req.params.id);
        let remove = db.User.destroy({
            where: {
                id: req.params.id
            }
        });
        
        Promise.all([user,remove])
        .then(([user,remove])=>{
            
            if(fs.existsSync(path.join('public','images','users',user.avatar))){
                fs.unlinkSync(path.join('public','images','users',user.avatar))
            }
            
            return res.redirect('/');
        })
        .catch(error => console.log(error))
    },
    cerrarSession:(req,res)=>{ /* cerrar sesion */
        req.session.destroy();
        if(req.cookies.recordar){
            res.cookie('recordar','',{
                maxAge : -1
            })
        }
        res.redirect('/')
    }
}

