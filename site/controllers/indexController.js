const path = require('path');
const db = require(path.join('..','database','models'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {Op}=require('sequelize')
module.exports={
    index:(req,res)=>{
        
        db.Productos.findAll({
            where:{  
                discount:{
                    [Op.ne]:0
                },
                stock:{
                    [Op.ne]:0
                }
            },
            include:[{association:"imagenProducto"}]
        })
        .then(products=>{
            res.render('index',{products,toThousand});
        })
        .catch(error => res.send(error));
              
    },
    search:(req,res)=>{

        db.Productos.findAll({
            include:[{association:"imagenProducto"},{association:"categoria"},{association:"subcategoria"}]
        })
        .then(result=>{
            const search = result.filter(element=>{
                if(element.name.toLowerCase().includes(req.query.busqueda.toLowerCase().trim()) || element.subcategoria.name.toLowerCase().includes(req.query.busqueda.toLowerCase().trim()) || element.categoria.name.toLowerCase().includes(req.query.busqueda.toLowerCase().trim()) ){
                    return element;
                }
            })

            res.render('search',{search,toThousand});
        })
        .catch(error => res.send(error));
        
    },
    nosotros:(req,res)=>{
        res.render('sobreNosotros',{
           
        })
    },
    contacto:(req,res) => {
        res.render("contacto",{
            
        })
    },
    mediosDePago:(req,res) => {
        res.render("mediosDePago",{
            
        })
    },
    sucursales:(req,res) => {
        res.render("sucursales",{
           
        })
    }
}