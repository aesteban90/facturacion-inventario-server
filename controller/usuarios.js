const Usuarios = require('../models/usuarios.model.js');
const getUsuariosAll = (req, res) => {
    Usuarios.find()  
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}
const postUsuarioCreate = (req, res) => {
    const data = req.body;
    const newData = new Usuarios({
        nickname: data.nickname,
        nombre_completo: data.nombre_completo,
        password: data.password,
        roles: data.roles,
        user_created: data.user_created,
        user_updated: data.user_updated
        })

    newData.save()
        .then(() => res.json({add:true}))
        .catch(err => {console.log(err); res.status(400).json({add:false, message:err})});

}
const postUsuarioUpdate = (req, res) => {    
    Usuarios.findById(req.params.id)
        .then(data => {         
            data.nickname = req.body.nickname;
            data.nombre_completo = req.body.nombre_completo;
            data.password = req.body.password;
            data.roles = req.body.roles;
            data.user_updated = req.body.user_updated;

            data.save()
                .then(() => res.json({update: true}))
                .catch(err => res.status(400).json({update: false, message: err}));
        })
        .catch(err => res.status(400).json({update: false, message: err}));

}
const getUsuario = (req, res) => {
    Usuarios.findById(req.params.id)
        .then(data => {res.json(data)})
        .catch(err => res.status(400).json('Error: '+err));
}
const postUsuarioDelete = (req, res) => {
    Usuarios.findByIdAndDelete(req.params.id)
        .then(() => res.json({delete: true}))
        .catch(err => res.status(400).json({delete: true, message: err}));
}
module.exports = {getUsuariosAll, postUsuarioCreate, postUsuarioUpdate, getUsuario, postUsuarioDelete}
