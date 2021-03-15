const path = require('path');
const db = require(path.join('..','database','models'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports={
    index:(req,res)=>{
        
        db.Product.findAll({
            where: {
                discount: discount != 0
            }
        })
        .then(products=>{
            res.render('index',{products,toThousand,title: 'Mascoshop Home'});
        })
        .catch(error => res.send(error));
              
    },
    search:(req,res)=>{

        db.Product.findAll()
        .then(result=>{
            const search = result.filter(element=>{
                if(element.name.toLowerCase().includes(req.query.busqueda.toLowerCase().trim()) || element.category.toLowerCase().includes(req.query.busqueda.toLowerCase().trim())){
                    return element;
                }
            })

            res.render('search',{search,toThousand,title: 'Mascoshop resultados de busqueda'});
        })
        .catch(error => res.send(error));
        
    },
    nosotros:(req,res)=>{
        res.render('sobreNosotros',{
            title:'Mascoshop Sobre nosotros'
        })
    },
    contacto:(req,res) => {
        res.render("contacto",{
            title:"Contacto"
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