const CajasDetalles = require('../models/cajas-detalles.model.js');
const getCajasDetallesAll = (req, res) => {
    CajasDetalles.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}

const getCajasDetallesEstados = (req, res) => {
    CajasDetalles.find({caja: req.params.caja, estado: req.params.estado}).populate('inventario',['descripcion'])
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}


const postCajaDetalleCreate = async (req, res) => {
    const data = req.body;    
    const newData = new CajasDetalles({
        caja: data.caja,
        inventario: data.inventario,
        cantidad: data.cantidad,
        precio: data.precio,
        total: data.total,
        estado: data.estado,
        user_created: data.user_created,
        user_updated: data.user_updated
        })
    await newData.save()
        .then(() => res.json({add:true}))
        .catch(err => {console.log(err); res.status(400).json({add:false, message:err})});
    
}


const postCajaDetalleUpdateFactura = (req, res) => {    
    CajasDetalles.updateMany(
        {_id: { "$in": req.body.ids }},
        { $set: { factura: req.body.factura,  estado: "Facturado" }},    
    ).then(() => {
        res.json({update: true})
    })
}
const postCajaDetalleUpdate = (req, res) => {    
    CajasDetalles.findById(req.params.id)
        .then(data => {     
            data.factura = req.body.factura,
            data.cantidad =  req.body.cantidad,
            data.estado = req.body.estado,
            data.user_updated = req.body.user_updated;

            data.save()
                .then((data) => {                    
                    res.json({update: true})
                })                
                .catch(err => {console.log(err); res.status(400).json({update:false, message:err})});
        })
        .catch(err => {console.log(err); res.statu0s(400).json({update:false, message:err})});
}
const getCajaDetalle = (req, res) => {
    CajasDetalles.findById(req.params.id)
        .then(data => {res.json(data)})
        .catch(err => res.status(400).json('Error: '+err));
}
const postCajaDetalleDelete = (req, res) => {
    CajasDetalles.findByIdAndDelete(req.params.id)
        .then(data => {
           res.json({delete: true})
        })
        .catch(err => res.status(400).json({delete: true, message: err}));

        
}

module.exports = {getCajasDetallesAll, getCajasDetallesEstados, postCajaDetalleUpdateFactura, postCajaDetalleCreate, postCajaDetalleUpdate, getCajaDetalle, postCajaDetalleDelete}
