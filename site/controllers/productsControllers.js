const path = require('path');
const fs = require('fs');
const db = require(path.join('..', 'database', 'models'));
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    
    productCart: (req, res) => {
        
        res.render('productCart');
        
    },
    productAdd: (req, res) => {
        let pedidoCategoria = db.Categoria.findAll();
        let pedidoSubCategoria = db.SubCategoria.findAll()
        Promise.all([pedidoCategoria, pedidoSubCategoria])
        .then(function ([categoria, subcategoria]) {
            res.render('adminProduct/productAdd', {
                categoria,
                subcategoria
            })
        })
        
    },
    processProduct: (req, res) => {
        
        const { category, subcategory, name, precio, stock, discount, description } = req.body;
        
        const errores = validationResult(req);
        
        if (!errores.isEmpty()) {
            let pedidoCategoria = db.Categoria.findAll()
            let pedidoSubCategoria = db.SubCategoria.findAll()
            Promise.all([pedidoCategoria, pedidoSubCategoria])
            .then(([categoria, subcategoria]) => {
                if(req.files[0]){
                    fs.unlinkSync('public/images/productos/' +req.files[0].filename)
                }
                return res.render('adminProduct/productAdd', {
                    categoria,
                    subcategoria,
                    errores: errores.mapped(), /* convierte el valor del array en el valor de errors */
                    old: req.body
                    
                })
            })
        } else {
            db.Productos.create({
                name: name,
                precio: precio,
                stock: stock,
                discount: discount,
                description: description,
                category_id: category,
                subcategory_id: subcategory
            })
            .then((resultado) => {
                let id = resultado.id
                db.ImagenProducto.create({
                    product_name: (req.files[0]) ? req.files[0].filename : "productoDefault.png",
                    product_id: id
                })
            })
            .then(() => {
                res.redirect('/products/allProducts');
            })
        }
    },
    productDetail: (req, res) => {
        
        let pedidoCategoria = db.Categoria.findAll();
        let pedidoSubCategoria = db.SubCategoria.findAll();
        let losProductos = db.Productos.findByPk(req.params.id, {
            include: [{ association: "categoria" }, { association: "subcategoria" }, { association: "imagenProducto" }]
        })
        Promise.all([pedidoCategoria, pedidoSubCategoria, losProductos])/* trae todos los pedidos */
        .then(([categoria, subcategoria, product]) => {
            let laCategoria = [];
            let laSubCategoria = [];
            categoria.forEach(cate => {
                if (product.category_id == cate.id) {
                    laCategoria = cate
                }
            });
            subcategoria.forEach(sub => {
                if (product.subcategory_id == sub.id) {
                    laSubCategoria = sub
                }
            });
            db.Productos.findAll({
                include: [{ association: "categoria" }, { association: "subcategoria" }, { association: "imagenProducto" }],
                where: {
                    category_id: laCategoria.id
                },
                limit:8,
            })
            .then((productosRelacionados) => {
                res.render('productDetail', {
                    laCategoria,
                    laSubCategoria,
                    productosRelacionados,
                    product,
                    toThousand
                })
            })
        })
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
        /*   res.send(errores.mapped())  */
        if (!errores.isEmpty()) {
            let pedidoCategoria = db.Categoria.findAll()
            let pedidoSubCategoria = db.SubCategoria.findAll()
            let pedidoProducto = db.Productos.findByPk(req.params.id)
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
            const {name, precio, stock, discount, description, category, subcategory} = req.body;
            db.Productos.update({
                name: name.trim(),
                precio: precio,
                stock: stock,
                discount: discount,
                description: description.trim(),
                category_id: category,
                subcategory_id: subcategory
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect("/products/allProducts#productos-destacados")
            })
        }
    },
    productDelete: (req, res) => {
        db.ImagenProducto.findAll({
            where: {
                product_id: req.params.id
            }
        })
        .then((imagen) => {
            let eliminarImagen = db.ImagenProducto.destroy({
                where: {
                    product_id: req.params.id
                }
            })
            let eliminarProducto = db.Productos.destroy({
                where: {
                    id: req.params.id
                }
            })
            Promise.all([eliminarImagen, eliminarProducto])
            .then((result) => {
                imagen.forEach(element => {
                    if (element.product_name != 'productoDefault.png') {
                        fs.unlinkSync('public/images/productos/' + element.product_name)
                    }
                })
                res.redirect('/products/allProducts');
            })
        })
    },
    allProducts: (req, res) => {
        db.Productos.findAll({
            include: [{ association: "imagenProducto" }],
            where: {
                stock: {
                    [Op.ne]: 0
                }
            }
        })
        .then(function (products) {
            res.render("allProducts", { products: products, toThousand })
        })
    },
    productCategory: (req, res) => {
        db.Categoria.findOne({
            where: {
                name: req.params.category
            }
        })
        .then((categoria) => {
            /* res.send(categoria) */
            db.Productos.findAll({
                include: [{ association: "imagenProducto" }],
                where: {
                    category_id: categoria.id,
                    stock: {
                        [Op.ne]: 0
                    }
                }
            }).then((result) => {
                /* res.send(result) */
                res.render('productCategory', { result, toThousand })
            })
        })
    },
    productSubcategory: (req, res) => {
        db.SubCategoria.findOne({
            where: {
                name: req.params.subcategory/* traeme todos los alimentos o accesorios */
            }
        })
        .then((subcategoria) => {
            /*  res.send(subcategoria) */
            db.Productos.findAll({
                include: [{ association: "imagenProducto" }],
                where: {
                    subcategory_id: subcategoria.id,
                    stock: {
                        [Op.ne]: 0
                    }
                }
            }).then((result) => {
                res.render('productSubcategory', { result, toThousand })
            })
            
        })
    },
    productNav: (req, res) => {
        let pedidoCategoria = db.Categoria.findOne({
            where: {
                name: req.params.category
            }
        })
        let pedidoSubCategoria = db.SubCategoria.findOne({
            where: {
                name: req.params.subcategory
            }
        })
        Promise.all([pedidoCategoria, pedidoSubCategoria])
        .then(([categoria, subcategoria]) => {
            db.Productos.findAll({
                include: [{ association: "imagenProducto" }],
                where: {
                    category_id: categoria.id,
                    subcategory_id: subcategoria.id,
                    stock: {
                        [Op.ne]: 0
                    }
                }
            })
            .then((result) => {
                res.render('productNav', { result, toThousand })
            })
        })
    },
    productOfertas: (req, res) => {
        db.Productos.findAll({
            include: [{ association: "imagenProducto" }]
            ,
            where: {
                discount: {
                    [Op.ne]: 0
                },
                stock: {
                    [Op.ne]: 0
                }
            },
            include: [{ association: "imagenProducto" }]
        })
        .then(function (products) {
            res.render('productOfertas', {
                products, toThousand
            })
        })
    },
    productsStock: (req, res) => {
        db.Productos.findAll({
            include: [{ association: "imagenProducto" }]
            
        })
        .then((products) => {
            res.render('adminProduct/editarStock', {
                products, toThousand
            })
        })
    },
    cambiarStock: (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            db.Productos.findAll({
                include: [{ association: "imagenProducto" }]
            }).then((products) => {
                return res.render('adminProduct/editarStock', {
                    products,
                    toThousand,
                    errores: errores.mapped(), /* convierte el valor del array en el valor de errors */
                    old: req.body
                })
            })
        } else {
            let nuevoStock = req.body.stock
            db.Productos.update({
                stock: nuevoStock
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect('/products/productStock')
            })
        }
    }
}

