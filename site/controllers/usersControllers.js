const fs = require('fs');
const path=require('path');
/* const users_db=JSON.parse(fs.readFileSync(path.join('.','data','users.json'),'utf-8')); */
const bcrypt=require('bcrypt')  
const {validationResult} = require('express-validator');

const {getUsers, setUsers} = require(path.join('..','data','users'));
const users_db=getUsers();
module.exports = {
    /* pagina registro */
    register:(req,res)=>{
        res.render('users/register',{title:'Mascoshop registro'});
    },  
    /* proceso de registro */
    processRegister:(req,res)=>{ /* si no esta vacio   osea , si hay errores */
        const errores=validationResult(req);
       /*   res.send(errores.mapped())  */
        if(!errores.isEmpty()){
            return res.render('users/register',{
                errores : errores.mapped(),/* convierte el valor del array en el valor de errors */
                old:req.body,/* para que se guarden los datos que escribiste */
                title:'Mascoshop registro'
            })
        }else{
            
            const{name,apellido,email,passUno}=req.body;
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
                pais:"",
                localidad:"",
                telefono:"",
                category:"Usuario",
                avatar: req.files[0].filename
            }
            
            users_db.push(newUser);
            /* fs.writeFileSync('./data/users.json',JSON.stringify(users_db,null,2))  */
            setUsers(users_db);
            return res.redirect('/users/login')  ;
            
        }        
        
    },
    /* login */
    login:(req,res)=>{
        res.render('users/login',{
            title:'Mascoshop login'
        });
    },
    /* proceso login */
    processLogin:(req,res)=>{
        const errores=validationResult(req);
        /*  res.send(errores.mapped())   */

        if(!errores.isEmpty()){
            return res.render('users/login',{
                errores : errores.mapped(),/* convierte el valor del array en el valor de errors */
                old:req.body,
                title:'Mascoshop login'
            })
            
        }else{
              const{email,pass,recordarme}=req.body
            let result=users_db.find(user=>user.email==email);
           
             
            if(result){
                if(bcrypt.compareSync(pass.trim(),result.pass)){
                req.session.userNew={      
                    id:result.id,
                    username: result.name,
                    apellido: result.apellido,
                    email: result.email,
                    /* pais:result.pais, */
                    category:result.category,
                    avatar:result.avatar
                }
                //Cookie recordar
                if(recordarme){
                        res.cookie("recordar",req.session.userNew,{
                            maxAge : 1000 * 60 * 60
                        })
                    }
        

                    return res.redirect('/')
            }
        }
        res.render('users/login',{error: "Credenciales invalidas",title: 'Mascoshop'});

        }
    },  
    /* perfil */
    perfil:(req,res)=>{
        
        res.render('users/perfil',{title: 'Mascoshop Mi perfil'});
    },

    eliminarCuenta:(req,res)=>{
        
        users_db.forEach(user=>{
            if(user.id===Number(req.params.id)){

                if(fs.existsSync(path.join('public','images','users',user.avatar))){
                    fs.unlinkSync(path.join('public','images','users',user.avatar))
                }

                aEliminar=users_db.indexOf(user)
                users_db.splice(aEliminar,1)
            }
        });
      /*   fs.writeFileSync('./data/users.json',JSON.stringify(users_db,null,2)) */
       setUsers(users_db);
        req.session.destroy();
        if(req.cookies.recordar){
            res.cookie('recordar','',{
                maxAge : -1
            })
        }
        res.redirect('/');
        
    }, 
    /* vista de la pagina de editar cuenta */
    editaVistaEscencial:(req,res)=>{
        res.render('users/editPerfilEscencial',{title: 'Mascoshop Edit'});
    },
    
    /* formulario de editar cuenta */
    editarPerfilEscencial:(req,res)=>{
        const{nombre,apellido,email}=req.body;
        
        users_db.forEach(user => {
            if(user.id === Number(req.params.id)){
                user.name = nombre.trim(),
                user.apellido = apellido.trim(),
                user.email = email.trim()
            }
        });
        
       /*  fs.writeFileSync('./data/users.json',JSON.stringify(users_db,null,2)); */
       setUsers(users_db)
        req.session.destroy();
        if(req.cookies.recordar){
            res.cookie('recordar','',{
                maxAge : -1
            })
        }
        res.redirect('/users/login');
    },
    vistaDeEdicion:(req,res)=>{
        res.render('users/editPerfil',{title: 'Mascoshop Edit'});
    },
    edicionDePerfil:(req,res)=>{
        const{pais,localidad,direccion,telefono}=req.body;
        
        users_db.forEach(user => {
            if(user.id === Number(req.params.id)){
                user.pais = pais.trim(),
                user.localidad = localidad.trim(),
                user.direccion = direccion.trim(),
                user.telefono= Number(telefono.trim())
                
                /* gola */
            }
        });
        
        /* fs.writeFileSync('./data/users.json',JSON.stringify(users_db,null,2)); */
        setUsers(users_db);
        res.redirect('/');
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

