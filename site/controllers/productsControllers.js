const fs = require('fs');
const data = require('../data/dataproducts');

module.exports = {
    
    productCart:(req,res)=>{
        res.render('productCart');
        
    },
    productAdd:(req,res)=>{
        res.render('productAdd');
        
    },
    processProduct:(req,res)=>{
        const {category,subcategory,producto,precio,stock,state,description} = req.body;

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
            producto: producto,
            precio: precio,
            stock: stock,
            state: state,
            description: description,
            img: req.files[0].filename
        }

        data.push(newProduct);
        fs.writeFileSync('./data/products.json',JSON.stringify(data,null,2),'utf-8');

        res.redirect('/products/productAdd');

    },
    productDetail:(req,res)=>{
        let product = data.find(element => element.id === +req.params.id);
        
        res.render('productDetail',{product});
    },
    productEdit:(req,res)=>{
        let product = data.find(element => element.id === +req.params.id);

        res.render('productEdit',{product});
    },
    processEdit:(req,res)=>{
        const {category,subcategory,producto,precio,stock,state,description} = req.body;

        data.forEach(element=>{
            if(element.id == req.params.id){
                element.id = element.id;
                element.category = category;
                element.subcategory = subcategory;
                element.producto = producto;
                element.precio = precio;
                element.stock = stock;
                element.state = state;
                element.description = description;
                element.img = element.img;
            }

        });

        fs.writeFileSync('./data/products.json',JSON.stringify(data,null,2),'utf-8');

        res.redirect('/products/productAdd');
    },
    allProducts:(req,res)=>{
        res.render('allProducts');
    }

}