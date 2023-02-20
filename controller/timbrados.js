const Timbrados = require('../models/timbrados.model.js');
const getTimbradosAll = (req, res) => {
    Timbrados.find()  
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}
const postTimbradoCreate = (req, res) => {
    const data = req.body;
    const newData = new Timbrados({
        ruc: data.ruc,
        nombreEmpresa: data.nombreEmpresa,
        vencimiento: data.vencimiento,
        estado: data.estado,
        numero: data.numero,
        comprobante: data.comprobante,
        user_created: data.user_created,
        user_updated: data.user_updated
        })

    newData.save()
        .then(() => res.json({add:true}))
        .catch(err => {console.log(err); res.status(400).json({add:false, message:err})});

}
const postTimbradoUpdate = (req, res) => {    
    Timbrados.findById(req.params.id)
        .then(data => {         
            data.ruc = req.body.ruc;
            data.nombreEmpresa = req.body.nombreEmpresa;
            data.vencimiento = req.body.vencimiento;
            data.estado = req.body.estado;
            data.numero = req.body.numero;
            data.comprobante = req.body.comprobante;
            data.user_updated = req.body.user_updated;

            data.save()
                .then(() => res.json({update: true}))
                .catch(err => res.status(400).json({update: false, message: err}));
        })
        .catch(err => res.status(400).json({update: false, message: err}));

}
const postTimbradoUpdateEstado = (req, res) => {    
    //actualizando los demas timbrados para desactivados
    req.body.datos.map(el => {
        Timbrados.findById(el._id)
            .then(data => { 
                data.estado = 'desactivado';
                data.user_updated = req.body.user_updated;
                data.save();
            })
    })   
    
    //actualizando el principal para activado
    Timbrados.findById(req.params.id)
        .then(data => {         
            data.estado = 'activado';
            data.user_updated = req.body.user_updated;
            data.save()
                .then(() => res.json({update: true}))
                .catch(err => res.status(400).json({update: false, message: err}));
        })
        .catch(err => res.status(400).json({update: false, message: err}));
    

}
const getTimbradoActivo = (req, res) => {
    Timbrados.findOne({estado: 'activado'}).select('nombreEmpresa ruc vencimiento numero comprobante -_id')
        .then(data => {res.json(data)})
        .catch(err => res.status(400).json('Error: '+err));
}

const getTimbrado = (req, res) => {
    Timbrados.findById(req.params.id)
        .then(data => {res.json(data)})
        .catch(err => res.status(400).json('Error: '+err));
}
const postTimbradoDelete = (req, res) => {
    Timbrados.findByIdAndDelete(req.params.id)
        .then(() => res.json({delete: true}))
        .catch(err => res.status(400).json({delete: true, message: err}));
}
module.exports = {getTimbradosAll, getTimbradoActivo, postTimbradoCreate, postTimbradoUpdate, postTimbradoUpdateEstado, getTimbrado, postTimbradoDelete}
