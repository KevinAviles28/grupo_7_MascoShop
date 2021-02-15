const fs = require('fs');
const path = require('path');
const data = require('../data/dataproducts');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    
    productCart:(req,res)=>{
        res.render('productCart');
        
    },
    productAdd:(req,res)=>{
        res.render('productAdd');
        
    },
    processProduct:(req,res)=>{
        const {category,subcategory,name,precio,stock,discount,description} = req.body;

        let lastId = 0;

        data.forEach(element=>{
            if(element.id > lastId){
                return lastId = element.id;
            }
        });

        const newProduct = {
            id: +lastId + 1,
            category: category,
            subcategory: subcategory,
            name: name,
            precio: +precio,
            stock: +stock,
            discount: +discount,
            description: description.trim(),
            img: req.files[0].filename
        }

        data.push(newProduct);
        fs.writeFileSync('./data/products.json',JSON.stringify(data,null,2),'utf-8');

        res.redirect('/products/allProducts');

    },
    productDetail:(req,res)=>{
        let product = data.find(element => element.id === +req.params.id);

        let productRelacionados = []

        data.forEach(element=>{
            if(product.category == element.category){
                return productRelacionados.push(element);
            }
        })
        
        res.render('productDetail',{product,productRelacionados,toThousand});
    },
    productEdit:(req,res)=>{
        let product = data.find(element => element.id === +req.params.id);

        res.render('productEdit',{product});
    },
    processEdit:(req,res)=>{
        const {category,subcategory,name,precio,stock,discount,description} = req.body;

        data.forEach(element=>{
            if(element.id == req.params.id){
                element.id = element.id;
                element.category = category;
                element.subcategory = subcategory;
                element.name = name;
                element.precio = +precio;
                element.stock = +stock;
                element.discount = +discount;
                element.description = description;
                element.img = element.img;
            }

        });

        fs.writeFileSync('./data/products.json',JSON.stringify(data,null,2),'utf-8');

        res.redirect('/products/productAdd');
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

        fs.writeFileSync('./data/products.json',JSON.stringify(data,null,2),'utf-8');

        res.redirect('/products/allProducts')
    },
    allProducts:(req,res)=>{

        let products = data;

        res.render('allProducts',{products,toThousand});
    }

}