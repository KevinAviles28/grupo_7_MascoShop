const path = require('path');
const db = require(path.join('..','database','models'));

module.exports = {
    lista:(req,res)=>{
        db.User.findAll()
        .then(result=>{
            res.render('admin/listaUsers',{result});
        })
        .catch(error=> console.log(error));
    },
    edit:(req,res)=>{
        /* res.send(req.body) */
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
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(()=>{
            res.redirect('/admin/lista');
        })
        .catch(error=> console.log(error));
    }
}