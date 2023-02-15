const CajasConfig = require('../models/cajas-configuraciones.model.js');
const getCajasConfigAll = (req, res) => {
    CajasConfig.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}

const postCajaConfigCreate = async (req, res) => {
    const data = req.body;    
    const newData = new CajasConfig({
        descripcion: data.descripcion,
        user_created: data.user_created,
        user_updated: data.user_updated
        })
    await newData.save()
        .then(() => res.json({add:true}))
        .catch(err => {console.log(err); res.status(400).json({add:false, message:err})});
    
}
const postCajaConfigUpdate = (req, res) => {    
    CajasConfig.findById(req.params.id)
        .then(data => {       
            data.descripcion =  req.body.descripcion,
            data.user_updated = req.body.user_updated;

            data.save()
                .then((data) => {                    
                    res.json({update: true})
                })                
                .catch(err => {console.log(err); res.status(400).json({update:false, message:err})});
        })
        .catch(err => {console.log(err); res.status(400).json({update:false, message:err})});
}
const getCajaConfig = (req, res) => {
    CajasConfig.findById(req.params.id)
        .then(data => {res.json(data)})
        .catch(err => res.status(400).json('Error: '+err));
}
const postCajaConfigDelete = (req, res) => {
    CajasConfig.findByIdAndDelete(req.params.id)
        .then(data => {
           res.json({delete: true})
        })
        .catch(err => res.status(400).json({delete: true, message: err}));

        
}

module.exports = {getCajasConfigAll, postCajaConfigCreate, postCajaConfigUpdate, getCajaConfig, postCajaConfigDelete}
