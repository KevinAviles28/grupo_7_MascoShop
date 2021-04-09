const path = require('path');
const db = require(path.join('..','database','models'));
const { Op } = require('sequelize');

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
    }
}