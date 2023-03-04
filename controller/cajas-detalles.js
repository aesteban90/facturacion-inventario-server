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
        .catch(err => {console.log(err); res.status(400).json({update:false, message:err})});
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

const getProductsTotalesPorMes = (req, res) => {
    CajasDetalles.aggregate([
        //{ $match: { _id: 'your_product_id' } }, // filter by product ID
        { $group: { 
            _id: { year: {$year: '$createdAt'}, month: {$month: '$createdAt'},day: { $dayOfMonth : "$createdAt" }}, 
            totalPrecio: { $sum: '$total' }  } 
        },
        { $sort: {  _id : 1 } }, // sort by createdAt in ascending order  
        { $group: { 
            _id : { year: "$_id.year", month: "$_id.month" }, 
            dailyusage: { $push: { day: "$_id.day", totalPrecio: "$totalPrecio" }}}            
        },
        { $sort: {  _id : 1 } }, // sort by createdAt in ascending order  
        { $group : { 
            _id : { year: "$_id.year" }, 
            monthlyusage: { $push: { month: "$_id.month", dailyusage: "$dailyusage" }}}
        }               
    ])
    .then(products => {
        res.json(products)
    })
    .catch(err => res.status(400).json('Error: '+ err));
    
}

const getProductsMasVendidos = (req, res) => {
    CajasDetalles.aggregate([
        //{ $match: { _id: 'your_product_id' } }, // filter by product ID
        {
            $lookup: {
              from: 'inventarios', // The collection name to populate from
              localField: 'inventario', // The field to join with the other collection
              foreignField: '_id', // The field on the other collection to join on
              as: 'inventarioarray' // The field name to add the result to
            }
        },
        { $unwind: '$inventario' }, // flatten the sales array
        //{ $group: { _id: '$inventario', totalSales: { $sum: '$cantidad' } } }, // group by product ID and sum the sales quantity
        { $group: { _id: '$inventarioarray', totalCantidad: { $sum: '$cantidad' }, totalPrecio: { $sum: '$total' }} }, // group by product ID and sum the sales quantity
        { $sort: { totalSales: -1 } }, // sort by total sales in descending order
        { $limit: 10 } // return the top 10 products
    ])
    .then(products => {
        res.json(products)
    })
    .catch(err => res.status(400).json('Error: '+ err));
    
}

module.exports = {getCajasDetallesAll, getCajasDetallesEstados, getProductsMasVendidos, getProductsTotalesPorMes, postCajaDetalleUpdateFactura, postCajaDetalleCreate, postCajaDetalleUpdate, getCajaDetalle, postCajaDetalleDelete}
