/* const data = require('../data/dataproducts'); */
const path= require('path');
const {getProducts, setProducts} = require(path.join('..','data','dataproducts'));
const data=getProducts();
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports={
    index:(req,res)=>{
        let products = [];
        
        data.forEach(element=>{
            if(element.discount != 0){
                return products.push(element);
            }
        })
        
        res.render('index',{products,toThousand,title: 'Mascoshop Home'});
        
    },
    search:(req,res)=>{
        const search = data.filter(element=>{
            if(element.name.toLowerCase().includes(req.query.busqueda.toLowerCase().trim()) || element.category.toLowerCase().includes(req.query.busqueda.toLowerCase().trim())){
                return element;
            }
            /* return element.name.toLowerCase().includes(req.query.busqueda.toLowerCase().trim()); */
        })
        
        res.render('search',{search,toThousand,title: 'Mascoshop resultados de busqueda'});
    },
    nosotros:(req,res)=>{
        res.render('sobreNosotros',{
            title:'Mascoshop Sobre nosotros'
        })
    },
    contacto:(req,res) => {
        res.render("contacto",{
            title:"contacto"
        })
    },
    mediosDePago:(req,res) => {
        res.render("mediosDePago",{
            title:"Medios de Pago"
        })
    },
    sucursales:(req,res) => {
        res.render("sucursales",{
            title:"Nuestros locales"
        })
    }
}