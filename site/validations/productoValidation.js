const {check,body}=require('express-validator')

module.exports=[
    /* 7 validaciones */
    body('category').custom(value=>{
        if(value==='Categoria'){
            return false;
        }else{
            return true;
        }
    }).withMessage('Por favor seleccione una categoria'),

    body('subcategory').custom(value=>{
        if(value==='Sub-categoria'){
            return false;
        }else{
            return true;
        }
    }).withMessage('Por favor seleccione una sub categoria'),

    check('name').notEmpty().withMessage('El nombre del producto es obligatorio'),

    check('precio').notEmpty().withMessage('El precio del producto es obligatorio'),

    check('stock').notEmpty().withMessage('El stock no puede esta vacio'),

    check('discount').notEmpty().withMessage('Debe tener un descuente de 0,15,30 o 50 %'),

    check('description').notEmpty().withMessage('El producto debe de tener una descripcion')
]