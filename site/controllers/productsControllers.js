const path = require('path');
const fs=require('fs')
const db = require(path.join('..','database','models'));
const {validationResult} = require('express-validator');
const {Op}=require('sequelize')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    
    productCart:(req,res)=>{
        
        res.render('productCart');
        
    },
    productAdd:(req,res)=>{
        let pedidoCategoria=db.Categoria.findAll(); 
        let pedidoSubCategoria=db.SubCategoria.findAll()
        Promise.all([pedidoCategoria,pedidoSubCategoria])
        .then(function([categoria,subcategoria]){
            res.render('adminProduct/productAdd',{
                categoria,
                subcategoria
            })
        })    
        
    },
    processProduct:(req,res)=>{

        const {category,subcategory,name,precio,stock,discount,description} = req.body;

        const errores = validationResult(req);

        if(!errores.isEmpty()){

            return res.render('adminProduct/productAdd',{ 
                errores : errores.mapped(), /* convierte el valor del array en el valor de errors */
                old:req.body
                
            });

        }else{
            db.Cate_subs.findOne({
                where:{
                    category_id:category,
                    sub_category_id:subcategory 
                }
            })
            .then(function(cateSub){
                db.Productos.create({/* creo una creo un producto con sus datos */
                
                    name:name,
                    precio:precio,
                    stock:stock,
                    discount:discount,
                    description:description,
                    cate_sub_id:cateSub.id 
                })
                .then((resultado)=>{/* con el resultado creo una imagen  */
                    let id=resultado.id
                    db.ImagenProducto.create({
                        product_name:(req.files[0])?req.files[0].filename:"productoDefoult.png",
                        product_id:id
                    })
                    .then(function(){
                        res.redirect('/');
                    })
                    
                })
                /* res.redirect("/"); */
            })
            
        }    
    },
    productDetail:(req,res)=>{

        let pedidoCategoria=db.Categoria.findAll();
        let pedidoSubCategoria=db.SubCategoria.findAll();
        let losProductos=db.Productos.findByPk(req.params.id,{
            include:[{association:"cateSub"},{association:"imagenProducto"}]
        })
        Promise.all([pedidoCategoria,pedidoSubCategoria,losProductos])/* trae todos los pedidos */
        .then(([categoria,subcategoria,product])=>{
            res.render('productDetail',{
                categoria,
                subcategoria,
                product,
                toThousand
            })
        })
        /* let product = db.Product.findByPk(+req.params.id);
        let productRelacionados = db.category.findAll({
            where: {
                category_id: product.category_id
            }
        });
        Promise.all([product,productRelacionados])
        .then(([product,productRelacionados])=>{
            return res.render('productDetail',{product,productRelacionados,toThousand});
        }) */
        
        
    },
    productEdit:(req,res)=>{
        /* let product = data.find(element => element.id === +req.params.id);
        
        res.render('adminProduct/productEdit'); */
        let pedidoCategoria=db.Categoria.findAll();
        let pedidoSubCategoria=db.SubCategoria.findAll();
        let elProducto=db.Productos.findByPk(req.params.id,{
            include:[{association:"cateSub"},{association:"imagenProducto"}]
        })
        Promise.all([pedidoCategoria,pedidoSubCategoria,elProducto])
        .then(([categoria,subcategoria,product])=>{
            let valorCategoria;
            let valorSubcategoria;
            categoria.forEach(cate => {
                if(product.cateSub.category_id == cate.id){
                 valorCategoria=cate.name
                }
            });
            subcategoria.forEach(sub=>{
                if(product.cateSub.sub_category_id==sub.id){
                    valorSubcategoria=sub.name
                }
            })
            res.render('adminProduct/productEdit',{
                categoria,
                subcategoria,
                product,
                valorCategoria,
                valorSubcategoria
            })
        })
    },
    processEdit:(req,res)=>{
        /* let product = data.find(element => element.id === +req.params.id); */
        
        /* const {category,subcategory,name,precio,stock,discount,description,img} = req.body; */
        
        const errores=validationResult(req);
        /*   res.send(errores.mapped())  */
        if(!errores.isEmpty()){
            return res.render('adminProduct/productEdit',{ 
                product,
                errores : errores.mapped(), /* convierte el valor del array en el valor de errors */
                old:req.body
                
            })
        }else{
            const{name,precio,stock,discount,description,category,subcategory}=req.body;
        db.Productos.update({
            name:name.trim(),
            price:precio,
            stock:stock,
            discount:discount,
            description:description.trim(),
            category_id:category,
            sub_category_id:subcategory
        },{
            where:{
                id:req.params.id
            }
        })
        .then(()=>{
            res.redirect("/products/allProducts#productos-destacados")
        })

            
           /*  data.forEach(element=>{
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
         */
    }
    },
    productDelete:(req,res)=>{
       /*  data.forEach(element=>{
            if(element.id == req.params.id){
                
                if(fs.existsSync(path.join('public','images','productos',element.img))){
                    fs.unlinkSync(path.join('public','images','productos',element.img))
                }
                
                let idEliminado = data.indexOf(element);
                data.splice(idEliminado,1);
            }
        });
        setProducts(data);
        res.redirect('/products/allProducts#productos-destacados'); */
    },
    allProducts:(req,res)=>{
        db.Productos.findAll({
            include:[{association:"cateSub"},{association:"imagenProducto"}]
        })
        .then(function(products){
            res.render("allProducts",{products:products,toThousand})
        })
       /*  let products = data;
        
        res.render('allProducts',{products,toThousand}); */
    },
    productCategory:(req,res)=>{
        db.Categoria.findOne({
            where:{
                name:req.params.category
            }
        })
        .then((categoria)=>{
            db.Cate_subs.findOne({
                where:{
                    category_id:categoria.id,
                }
            }).then((resultado)=>{
                db.Productos.findAll({
                    include:[{association:"cateSub"},{association:"imagenProducto"}]
                },{
                    where:{
                        cate_sub_id:resultado.id
                    }
                }).then((result)=>{
                    res.render('productCategory',{result,toThousand})
                })
            })
        })
         /* let result =data.filter(element=>{
            if(element.category == req.params.category){
                return element
            }
        });
        
        res.render('productCategory',{result,toThousand}); */
    },
    productSubcategory:(req,res)=>{
        db.SubCategoria.findOne({
            where:{
                name:req.params.subcategory
            }
        })
        .then((subcategoria)=>{
            db.Cate_subs.findOne({
                where:{
                    category_id:subcategoria.id,
                }
            }).then((resultado)=>{
                db.Productos.findAll({
                    include:[{association:"cateSub"},{association:"imagenProducto"}]
                },{
                    where:{
                        cate_sub_id:resultado.id
                    }
                }).then((result)=>{
                    res.render('productSubcategory',{result,toThousand})
                })
            })
        })
        /*  let result=data.filter(element=>{
            if(element.subcategory == req.params.subcategory){
                return element;
            }
        });
        
        res.render('productSubcategory',{result,toThousand}); */
    },
    productNav:(req,res)=>{
        let pedidoCategoria=db.Categoria.findOne({
            where:{
                name:req.params.category
            }
        })
        let pedidoSubCategoria=db.SubCategoria.findOne({
            where:{
                name:req.params.subcategory
            }
        })
        Promise.all([pedidoCategoria,pedidoSubCategoria])
        .then(([categoria,subcategoria])=>{
        db.Cate_subs.findOne({
            where:{
                category_id:categoria.id,
                sub_category_id:subcategoria.id
            }
        })
        .then((resultado)=>{
            db.Productos.findAll({
                include:[{association:"cateSub"},{association:"imagenProducto"}]
            },{
                where:{
                    cate_sub_id:resultado.id
                }
            }).then((result)=>{
                res.render('productNav',{result,toThousand})
            })
        })
    })
       /*  
        let result= data.filter(element=>{
            if(element.category == req.params.category && element.subcategory == req.params.subcategory){
                return element;
            }
        })
        
        res.render('productNav',{result,toThousand}); */
    },
    productOfertas:(req,res)=>{
        db.Productos.findAll({
            where:{
                discount:{
                    [Op.ne]:0
                }
            }
        })
        .then(function(products){
            res.render('productOfertas',{
                products,toThousand
            })
        })
       /*  let products= data.filter(element=>{
            if(element.discount != 0){
                return element;
            }
        })
        res.render('productOfertas',{products,toThousand}); */
    }
}