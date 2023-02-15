const Cajas = require('../models/cajas.model.js');
const getCajasAll = (req, res) => {
    Cajas.find().populate('cajaConf',['descripcion']) //colocar en el array los fields que se necesitan
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}

const postCajaCreate = async (req, res) => {
    const data = req.body;    

    const newData = new Cajas({
        cajaConf: data.caja,
        montoApertura: data.montoApertura,
        montoCierre: data.montoCierre,
        estado: data.estado,
        fechaApertura: data.fechaApertura,
        fechaCierre: data.fechaCierre,
        user_created: data.user_created,
        user_updated: data.user_updated
    })

    await newData.save()
        .then(() => res.json({add:true}))
        .catch(err => {console.log(err); res.status(400).json({add:false, message:err})});
    
}
const postCajaUpdate = (req, res) => {    
    Cajas.findById(req.params.id)
        .then(data => {       
            data.montoApertura =  req.body.montoApertura,
            data.montoCierre = req.body.montoCierre;
            data.estado = req.body.estado;
            data.fechaApertura = req.body.fechaApertura;
            data.fechaCierre = req.body.fechaCierre;
            data.user_updated = req.body.user_updated;

            data.save()
                .then((data) => {                    
                    res.json({update: true})
                })                
                .catch(err => {console.log(err); res.status(400).json({update:false, message:err})});
        })
        .catch(err => {console.log(err); res.status(400).json({update:false, message:err})});
}
const getCaja = (req, res) => {
    Cajas.findById(req.params.id).populate('cajaConf',['descripcion']) //colocar en el array los fields que se necesitan
        .then(data => {res.json(data)})
        .catch(err => res.status(400).json('Error: '+err));
}
const postCajaDelete = (req, res) => {
    Cajas.findByIdAndDelete(req.params.id)
        .then(data => {
           res.json({delete: true})
        })
        .catch(err => res.status(400).json({delete: true, message: err}));

        
}

module.exports = {getCajasAll, postCajaCreate, postCajaUpdate, getCaja, postCajaDelete}
