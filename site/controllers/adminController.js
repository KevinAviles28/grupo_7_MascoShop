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

        let user = db.User.findByPk(req.params.id);
        let remove = db.User.destroy({
            where: {
                id: req.params.id
            }
        });
        
        Promise.all([user,remove])
        .then(([user,remove])=>{
            
            if(user.avatar != 'usuarioDefault.png') {
                fs.unlinkSync('public/images/users/' + user.avatar)
            }
            
            return res.redirect('/admin/lista');
        })
        .catch(error => console.log(error))
    }
}