const path = require('path');
const db = require(path.join('..','database','models'));
const { Op } = require('sequelize');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {validationResult}=require('express-validator');
const fs=require('fs')


module.exports = {
    lista:(req,res)=>{
        db.User.findAll()
        .then(result=>{
            res.render('admin/listaUsers',{result});
        })
        .catch(error=> console.log(error));
    },
    edit:(req,res)=>{
        db.User.update({
            category: req.body.category
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect('/admin/lista');
        })
        .catch(error=> console.log(error));
    },
    remove:(req,res)=>{
        
        db.User.findByPk(req.params.id)
        .then(user=>{
            if(user.avatar != 'usuarioDefault.png') {
                fs.unlinkSync('public/images/users/' + user.avatar)
            }
        })
        .catch(error => console.log(error))
        
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            return res.redirect('/admin/lista');
        })
        .catch(error => console.log(error))
    },
    listaProducts:(req,res)=>{

        db.Productos.findAll({
            include: [{association: "imagenProducto"},{association: "subcategoria"},{association: "categoria"}]
        })
        .then(products=>{

            res.render('admin/listaProducts',{
                products,
                toThousand
            });
            
        })
        .catch(error=> console.log(error));
    },
    productEdit: (req, res) => {
        
        let pedidoCategoria = db.Categoria.findAll();
        let pedidoSubCategoria = db.SubCategoria.findAll();
        let elProducto = db.Productos.findByPk(req.params.id, {
            include: [{ association: "categoria" }, { association: "subcategoria" }, { association: "imagenProducto" }]
        })
        Promise.all([pedidoCategoria, pedidoSubCategoria, elProducto])
        .then(([categoria, subcategoria, product]) => {
            res.render('adminProduct/productEdit', {
                categoria,
                subcategoria,
                product
            })
        })
    },
    processEdit: (req, res) => {
        
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            let pedidoCategoria = db.Categoria.findAll()
            let pedidoSubCategoria = db.SubCategoria.findAll()
            let pedidoProducto = db.Productos.findByPk(req.params.id,{
                include: [{ association: "categoria" }, { association: "subcategoria" }, { association: "imagenProducto" }]
            })
            Promise.all([pedidoCategoria, pedidoSubCategoria, pedidoProducto])
            .then(([categoria, subcategoria, product]) => {
                return res.render('adminProduct/productEdit', {
                    categoria,
                    subcategoria,
                    product,
                    errores: errores.mapped(), /* convierte el valor del array en el valor de errors */
                    old: req.body
                })
            })
        } else {
            const {name, precio, stock, discount, description, category, subcategory, img} = req.body;
            let elParams=req.params.id;
            if(req.files[0]){
               let eliminarImagenAnterior= db.ImagenProducto.findAll({
                   where:{
                       product_id:elParams
                   }
               });
              let cambioImagen= db.ImagenProducto.update({
                product_name:req.files[0].filename
               },{
                   where:{
                       id:elParams
                   }
               });
               Promise.all([eliminarImagenAnterior,cambioImagen])
               .then(([deleteImagen,updateImages])=>{
                deleteImagen.forEach(element => {
                    if (element.product_name != 'productoDefault.png') {
                        fs.unlinkSync('public/images/productos/' + element.product_name)
                    }
                })
                db.Productos.update({
                    name: name.trim(),
                    precio: precio,
                    stock: stock,
                    discount: discount,
                    description: description.trim(),
                    category_id: category,
                    subcategory_id: subcategory
                },{
                    where:{
                        id:elParams
                    }
                })
                .then(()=>{
                    res.redirect("/products/allProducts#productos-destacados")
                })
               })
            }else{
                db.Productos.update({
                    name: name.trim(),
                    precio: precio,
                    stock: stock,
                    discount: discount,
                    description: description.trim(),
                    category_id: category,
                    subcategory_id: subcategory
                },{
                    where:{
                        id:elParams
                    }
                })
                .then(()=>{
                    res.redirect("/products/allProducts#productos-destacados")
                })
            }
        }
    },
    productDelete: (req, res) => {
        /* res.send(req.params) */
        let elParams=req.params.id;
        let eliminarImagenDirectorio= db.ImagenProducto.findAll({
            where:{
                product_id:elParams
            }
        });
       let elimiarImagenDB= db.ImagenProducto.destroy({
            where:{
                id:elParams
            }
        });
        Promise.all([eliminarImagenDirectorio,elimiarImagenDB])
        .then(([deleteImagen,updateImages])=>{
         deleteImagen.forEach(element => {
             if (element.product_name != 'productoDefault.png') {
                 fs.unlinkSync('public/images/productos/' + element.product_name)
             }
         })
        })
         db.Productos.destroy({
             where:{
                 id:elParams
             }
         }).then(()=>{
            res.redirect('/admin/listaProducts');
         })
    }
}