const fs = require('fs');
const path=require('path');
const users_db=JSON.parse(fs.readFileSync(path.join('.','data','users.json'),'utf-8'));
const bcrypt=require('bcrypt')  
const {check, validationResult, body} = require('express-validator');

module.exports = {
    /* pagina registro */
    register:(req,res)=>{
        res.render('register');
    },  /* cosa nueva */
    /* proceso de registro */
    processRegister:(req,res)=>{ /* si no esta vacio   osea , si hay errores */
        const errores=validationResult(req);
        /* res.send(errores.mapped()) */
        if(!errores.isEmpty()){
            return res.render('register',{
                errores : errores.mapped(),/* convierte el valor del array en el valor de errors */
                old:req.body,/* para que se guarden los datos que escribiste */
                title:'Mascoshop registro'
            })
        }else{
            
            const{name,apellido,email,passUno,pais}=req.body;
            
            let lastID=0;
            users_db.forEach(user => {
                if(user.id > lastID){                               
                    lastID = user.id
                }
            });
            
            let hashPass=bcrypt.hashSync(passUno,12)
            let newUser={
                id: +lastID+1,
                name,
                apellido,
                email,
                pass:hashPass,
                pais
            }
            
            users_db.push(newUser);
            fs.writeFileSync('./data/users.json',JSON.stringify(users_db,null,2))
            return res.redirect('/users/login') 
            
        }        
        
    },
    /* login */
    login:(req,res)=>{
        res.render('login',{
            title:'Mascoshop login'
        });
    },
    /* proceso login */
    processLogin:(req,res)=>{
        const errores=validationResult(req);
        if(!errores.isEmpty()){
            return res.render('login',{
                errores : errores.mapped(),/* convierte el valor del array en el valor de errors */
                old:req.body,
                title:'Mascoshop login'
            })
        }else{
            
            const{email,pass}=req.body;
            let result=users_db.find(user=>user.email==email);
            if(result){
                if(bcrypt.compareSync(pass.trim(),result.pass)){
                    
                    req.session.userNew={
                        /* objeto creado */
                        id:result.id,
                        username: result.name,
                        apellido: result.apellido,
                        email: result.email
                    }
                    
                    return res.redirect('/')
                    
                }
            }
            res.render('login',{error: "Credenciales invalidas"}) 
        }
    },  
    /* perfil */
    perfil:(req,res)=>{
        
        res.render('perfil');
    },
    eliminarCuenta:(req,res)=>{
        
        users_db.forEach(user=>{
            if(user.id===Number(req.params.id)){
                aEliminar=users_db.indexOf(user)
                users_db.splice(aEliminar,1)
            }
        });
        fs.writeFileSync('./data/users.json',JSON.stringify(users_db,null,2))
        req.session.destroy();
        res.redirect('/');
        
    }, 
    /* vista de la pagina de editar cuenta */
    editaVista:(req,res)=>{
        res.render('editPerfil');
    },
    
    /* formulario de editar cuenta */
    editarPerfil:(req,res)=>{
        const{nombre,apellido,email}=req.body;
        
        users_db.forEach(user => {
            if(user.id === Number(req.params.id)){
                
                user.name = nombre;
                user.apellido = apellido;
                user.email = email;
            }
        });
        
        fs.writeFileSync('./data/users.json',JSON.stringify(users_db,null,2));
        
        res.redirect('/');
    },
    cerrarSession:(req,res)=>{ /* cerrar sesion */
        req.session.destroy();
        res.redirect('/')
    }
}

