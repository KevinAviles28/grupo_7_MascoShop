module.exports={
    index:(req,res)=>{
        res.render('index');
        
    },
    productCart:(req,res)=>{
        res.render('productCart');
        
    },
    productAdd:(req,res)=>{
        res.render('productAdd');
        
    },
    productDetail:(req,res)=>{
        res.render('productDetail');
    }
}