const Inventarios = require('../models/inventarios.model.js');
const Compras = require('../models/compras.model.js');
const getInventariosAll = (req, res) => {
    Inventarios.find()  
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}
const getInventario = (req, res) => {
    Inventarios.findById(req.params.id)
        .then(banco => {res.json(banco)})
        .catch(err => res.status(400).json('Error: '+err));
}
const postInventarioStock = (req, res) => {    
    req.body.forEach(element => {
        Inventarios.findById(element.inventario._id)
            .then(data =>{
                data.cantidad -= element.cantidad;
                data.save()
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });

}

const postInventarioCreate = (req, res) => {
    const data = req.body;
    const newData = new Inventarios({
        codigo: data.codigo,
        descripcion: data.descripcion,
        cantidad: data.cantidad,
        precio_costo: data.precio_costo,
        precio_venta: data.precio_venta,
        user_created: data.user_created,
        user_updated: data.user_updated
    })

    newData.save()
        .then(() => res.json({add:true}))
        .catch(err => {console.log(err); res.status(400).json({add:false, message:err})});

}
const postInventarioUpdate = (req, res) => {    
    Inventarios.findById(req.params.id)
        .then(data => {         
            data.codigo = req.body.codigo,
            data.descripcion = req.body.descripcion,
            data.cantidad = req.body.cantidad,
            data.precio_costo = req.body.precio_costo,
            data.precio_venta = req.body.precio_venta,
            data.user_updated = req.body.user_updated;

            data.save()
                .then(() => res.json({update: true}))
                .catch(err => res.status(400).json({update: false, message: err}));
        })
        .catch(err => res.status(400).json({update: false, message: err}));
}


const postInventarioDelete = async (req, res) => {

    let compras = await Compras.find({inventario: req.params.id}).then(data => data);
    if(compras.length <= 0 ){
        Inventarios.findByIdAndDelete(req.params.id)
            .then(() => res.json({delete: 'success'}))
            .catch(err => res.status(400).json({delete: 'error', message: err}));
    }else{
        res.json({delete: 'relacionado'})
    }
}
module.exports = {getInventario, getInventariosAll, postInventarioStock, postInventarioCreate, postInventarioDelete, postInventarioUpdate}