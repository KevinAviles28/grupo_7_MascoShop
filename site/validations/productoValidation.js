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
    check('name').isLength({
        min:5
    }).withMessage('El nombre del producto debera tener al menos 5 caracteres'),

    check('precio').notEmpty().withMessage('El precio del producto es obligatorio'),

    check('stock').notEmpty().withMessage('El stock no puede esta vacio'),

    check('discount').notEmpty().withMessage('Por favor ingrese un valor de descuento'),

    check('description').notEmpty().withMessage('El producto debe de tener una descripcion'),
    check('description').isLength({
        min:20
    }).withMessage('La descripcion del producto debe de tener al menos 20 caracteres')/* ,

    check('img').isMimeType(['image/jpg','image/jpeg','image/png','image/gif']).withMessage('La imagen debe tener una extesión de tipo JPG, JPEG, PNG, GIF') */

]