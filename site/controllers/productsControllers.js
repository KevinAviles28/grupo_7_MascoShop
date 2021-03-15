const path = require('path');
const db = require(path.join('..','database','models'));
const {validationResult} = require('express-validator');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    
    productCart:(req,res)=>{
        res.render('productCart',{title: 'Mascoshop Carrito de compras'});
        
    },
    productAdd:(req,res)=>{
        res.render('adminProduct/productAdd',{title: 'Mascoshop Add product'});
        
    },
    processProduct:(req,res)=>{

        const {category,subcategory,name,precio,stock,discount,description} = req.body;

        const errores = validationResult(req);

        if(!errores.isEmpty()){

            return res.render('adminProduct/productAdd',{ 
                errores : errores.mapped(), /* convierte el valor del array en el valor de errors */
                old:req.body,
                title:'Mascoshop Add product'
            });

        }else{

            db.Product.create({
                category: category,
                subcategory: subcategory,
                name: name.trim(),
                precio: +precio,
                stock: +stock,
                discount: +discount,
                description: description.trim(),
                img: req.files[0].filename,
                exist: 1
            })
            .then(()=>{
                res.redirect('/products/allProducts#productos-destacados');
            })
            .catch(error => res.send(error));
            
        }    
    },
    productDetail:(req,res)=>{

        let product = db.Product.findByPk(+req.params.id);
        let productRelacionados = db.category.findAll({
            where: {
                category_id: product.category_id
            }
        });
        Promise.all([product,productRelacionados])
        .then(([product,productRelacionados])=>{
            return res.render('productDetail',{product,productRelacionados,toThousand,title: 'Mascoshop Detalle de producto'});
        })
        
        
    },
    productEdit:(req,res)=>{
        let product = data.find(element => element.id === +req.params.id);
        
        res.render('adminProduct/productEdit',{product, title: 'Mascoshop Edit'});
    },
    processEdit:(req,res)=>{
        let product = data.find(element => element.id === +req.params.id);
        
        const {category,subcategory,name,precio,stock,discount,description,img} = req.body;
        
        const errores=validationResult(req);
        /*   res.send(errores.mapped())  */
        if(!errores.isEmpty()){
            return res.render('adminProduct/productEdit',{ 
                product,
                errores : errores.mapped(), /* convierte el valor del array en el valor de errors */
                old:req.body,
                title:'Mascoshop edit product'
            })
        }else{
            
            data.forEach(element=>{
                if(element.id == req.params.id){
                    element.id = element.id;
                    element.category = category;
                    element.subcategory = subcategory;
                    element.name = name.trim();
                    element.precio = +precio;
                    element.stock = +stock;
                    element.discount = +discount;
                    element.description = description.trim();
                    element.img = img.trim();
                }
                
            });
      
            setProducts(data);
            res.redirect('/products/allProducts#productos-destacados');
        }
        
    },
    productDelete:(req,res)=>{
        data.forEach(element=>{
            if(element.id == req.params.id){
                
                if(fs.existsSync(path.join('public','images','productos',element.img))){
                    fs.unlinkSync(path.join('public','images','productos',element.img))
                }
                
                let idEliminado = data.indexOf(element);
                data.splice(idEliminado,1);
            }
        });
        setProducts(data);
        res.redirect('/products/allProducts#productos-destacados');
    },
    allProducts:(req,res)=>{
        
        let products = data;
        
        res.render('allProducts',{products,toThousand,title: 'Mascoshop Nuestros Productos'});
    },
    productCategory:(req,res)=>{
         let result =data.filter(element=>{
            if(element.category == req.params.category){
                return element
            }
        });
        
        res.render('productCategory',{result,toThousand,title: 'Mascoshop Producto por categoria'});
    },
    productSubcategory:(req,res)=>{
         let result=data.filter(element=>{
            if(element.subcategory == req.params.subcategory){
                return element;
            }
        });
        
        res.render('productSubcategory',{result,toThousand,title: 'Mascoshop Producto por categoria'});
    },
    productNav:(req,res)=>{
        
        let result= data.filter(element=>{
            if(element.category == req.params.category && element.subcategory == req.params.subcategory){
                return element;
            }
        })
        
        res.render('productNav',{result,toThousand,title: 'Mascoshop Producto por categoria'});
    },
    productOfertas:(req,res)=>{
        
        let products= data.filter(element=>{
            if(element.discount != 0){
                return element;
            }
        })
        res.render('productOfertas',{products,toThousand,title: 'Mascoshop Ofertas'});
    }
}