module.exports={
    index:(req,res)=>{
        res.render('index');
        
    },
    carrito:(req,res)=>{
        res.render('productCart');
        
    },
    product:(req,res)=>{
        res.render('productAdd');
        
    }
}