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

const postUpdateAllIVA10 = (req, res) => {    
    console.log("###### Actualizando { tipoImpuesto: 0, notificar_cantidad_minima: 0 } ")
    Inventarios.updateMany(
        {},
        { $set: { tipoImpuesto: 0, notificar_cantidad_minima: 0 }},    
    ).then(() => {
        res.json({update: true})
    })
}

const postInventarioStock = (req, res) => {    
    let categoriced = [];
    // Categoriza los productos en uno solo y los suma para actualizar el inventario
    categoriced = Object.values( req.body.reduce((agg, products) => {
        if (agg[products.inventario._id] === undefined) agg[products.inventario._id] = { id: products.inventario._id, sumQuantity: 0 }
        agg[products.inventario._id].sumQuantity += +products.cantidad
        return agg
      }, {})
    )
    //recorre el categoriced categorizado y lo actualiza
    categoriced.forEach(element => {
        Inventarios.findById(element.id)
            .then(data =>{
                data.cantidad -= element.sumQuantity;
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
        notificar_cantidad_minima: data.notificar_cantidad_minima,
        tipoImpuesto: data.tipoImpuesto,
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
            data.notificar_cantidad_minima = req.body.notificar_cantidad_minima,            
            data.tipoImpuesto = req.body.tipoImpuesto,
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
module.exports = {getInventario, getInventariosAll, postInventarioStock, postInventarioCreate, postInventarioDelete, postInventarioUpdate,postUpdateAllIVA10}