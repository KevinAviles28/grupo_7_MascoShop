const fs = require('fs');
const path=require('path');
const users_db=JSON.parse(fs.readFileSync(path.join('.','data','users.json'),'utf-8'));
const bcrypt=require('bcrypt')  
const {check, validationResult, body} = require('express-validator');

module.exports = {
    /* pagina registro */
    register:(req,res)=>{
        res.render('register');
    },  /* cosa nueva */ /* otra cosa */
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
          /*  res.send(errores.mapped())   */
        if(!errores.isEmpty()){
            return res.render('login',{
                errores : errores.mapped(),/* convierte el valor del array en el valor de errors */
                old:req.body,
                title:'Mascoshop login'
            })
        }else{
          /*   const{email}=req.body
            let result=users_db.find(user=>user.email==email);

            if(result){
                req.session.userNew={      
                    id:result.id,
                    username: result.name,
                    apellido: result.apellido,
                    email: result.email
                }
                return res.redirect('/')
            }
 */
            
            const{email,pass}=req.body;
            let result=users_db.find(user=>user.email==email.trim());
            if(result){
                if(bcrypt.compareSync(pass.trim(),result.pass)){
                    
                    req.session.userNew={
                      
                        id:result.id,
                        username: result.name,
                        apellido: result.apellido,
                        email: result.email,
                        pais:result.pais
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
        const{nombre,apellido,email,pais}=req.body;
        
        users_db.forEach(user => {
            if(user.id === Number(req.params.id)){
                user.name = nombre.trim(),
                user.apellido = apellido.trim(),
                user.email = email.trim(),
                user.pais=pais.trim()

            
            }
        });
        
        fs.writeFileSync('./data/users.json',JSON.stringify(users_db,null,2));
        req.session.destroy();
        res.redirect('/users/login');
    },
    cerrarSession:(req,res)=>{ /* cerrar sesion */
        req.session.destroy();
        res.redirect('/')
    }
}

