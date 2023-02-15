const Clientes = require('../models/clientes.model.js');
const getClientesAll = (req, res) => {
    Clientes.find()  
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}
const postClienteCreate = (req, res) => {
    const data = req.body;
    const newData = new Clientes({
        ruc: data.ruc,
        div: data.div,
        razonsocial: data.razonsocial,
        user_created: data.user_created,
        user_updated: data.user_updated
        })

    newData.save()
        .then(() => res.json({add:true}))
        .catch(err => {console.log(err); res.status(400).json({add:false, message:err})});

}
const postClienteUpdate = (req, res) => {    
    Clientes.findById(req.params.id)
        .then(data => {         
            data.ruc = req.body.ruc;
            data.div = req.body.div;
            data.razonsocial = req.body.razonsocial;
            data.user_updated = req.body.user_updated;

            data.save()
                .then(() => res.json({update: true}))
                .catch(err => res.status(400).json({update: false, message: err}));
        })
        .catch(err => res.status(400).json({update: false, message: err}));

}
const getCliente = (req, res) => {
    Clientes.findById(req.params.id)
        .then(data => {res.json(data)})
        .catch(err => res.status(400).json('Error: '+err));
}
const postClienteDelete = (req, res) => {
    Clientes.findByIdAndDelete(req.params.id)
        .then(() => res.json({delete: true}))
        .catch(err => res.status(400).json({delete: true, message: err}));
}
module.exports = {getClientesAll, postClienteCreate, postClienteUpdate, getCliente, postClienteDelete}
