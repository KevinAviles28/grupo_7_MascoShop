const fs = require('fs');
const data = require('../data/dataproducts');

module.exports={
    index:(req,res)=>{
        let products = [];
        
        data.forEach(element=>{
            if(element.discount != 0){
                return products.push(element);
            }
        })

        res.render('index',{products});
        
    }

}