const CajasDetalles = require('../models/cajas-detalles.model.js');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
        .catch(err => {console.log(err); console.log(data); res.status(400).json({add:false, message:err})});
    
}

const postCajaDetalleImportar = async (req, res) => {
    for (const index in req.body) {
        const element = req.body[index];
        const newData = new CajasDetalles({
            caja: element.caja,
            inventario: element.inventario,
            cantidad: element.cantidad,
            precio: element.precio,
            total: element.total,
            estado: element.estado,
            user_created: element.user_created,
            user_updated: element.user_updated,
            created_at: element.created_at,
            updated_at: element.updated,
        })
    
        await newData.save({timestamps: false})
            .catch(err => {console.log(err); console.log(newData); res.status(400).json({add:false, message:err})});
    }
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
            _id: { year: {$year: '$created_at'}, month: {$month: '$created_at'},day: { $dayOfMonth : "$created_at" }}, 
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
        { $group: { 
            _id: {  year: {$year: '$created_at'}, month: {$month: '$created_at'}, day: { $dayOfMonth : "$created_at" } , inventario: '$inventarioarray.descripcion'} , 
            totalPrecio: { $sum: '$total' }
        }},
        { $sort: {  _id : 1 } },
        { $group: { 
            _id : { year: "$_id.year", month: "$_id.month" , inventario: "$_id.inventario" }, 
            dailyusage: { $push: { day: "$_id.day", totalPrecio: "$totalPrecio" }}} 
        },        
        { $group : { 
            _id : { year: "$_id.year" , inventario: "$_id.inventario" }, 
            monthlyusage: { $push: { month: "$_id.month", dailyusage: "$dailyusage" }}}
        },        
        { $group : { 
            _id : { inventario: "$_id.inventario" }, 
            yearlyusage: { $push: { year: "$_id.year", monthlyusage: "$monthlyusage" }}}
        },
        { $sort: {  _id : 1 } },
        
    ])
    .then(products => {
        res.json(products)
    })
    .catch(err => res.status(400).json('Error: '+ err));    
}
/*
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
        { $group: { 
            _id: {  year: {$year: '$created_at'}, month: {$month: '$created_at'}, day: { $dayOfMonth : "$created_at" } , inventario: '$inventarioarray'} , 
            totalPrecio: { $sum: '$total' }
        }},
        { $sort: { totalPrecio: -1, _id: -1 } },
          // sort by createdAt in ascending order  
        { $group: { 
            _id : { year: "$_id.year", month: "$_id.month", day: "$_id.day" }, 
            productusage: { $push: { inventario: "$_id.inventario", totalPrecio: "$totalPrecio" }}}            
        },   
        { $sort: {  _id : 1 } },
        { $group: { 
            _id : { year: "$_id.year", month: "$_id.month" }, 
            dailyusage: { $push: { day: "$_id.day", productusage: "$productusage" }}}            
        },        
        { $sort: {  _id : 1 } },
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
*/
const getByFacturacion = (req, res) => {
    CajasDetalles.aggregate([
        { $match: { caja: ObjectId(req.params.id) } }, // filter by product ID       
        {
            $lookup: {
              from: 'facturas', // The collection name to populate from
              localField: 'factura', // The field to join with the other collection
              foreignField: '_id', // The field on the other collection to join on
              as: 'facturaarray' // The field name to add the result to
            }
        },    
        {
            $lookup: {
              from: 'inventarios', // The collection name to populate from
              localField: 'inventario', // The field to join with the other collection
              foreignField: '_id', // The field on the other collection to join on
              as: 'inventarioarray' // The field name to add the result to
            }
        },      
        { $sort: {  created_at : 1 } },
        { $group: { 
            _id: { factura: '$facturaarray' , inventario: '$inventarioarray', cantidad: '$cantidad', precio: '$precio', total: "$total"}            
        }},
        { $group: { 
            _id: { factura: '$_id.factura' },
            inventariousage: { $push: { inventario: "$_id.inventario", cantidad: '$_id.cantidad', precio: '$_id.precio', total: "$_id.total"}}
        }}
    ])
    .then(products => {
        res.json(products)
    })
    .catch(err => res.status(400).json('Error: '+ err));    
}

module.exports = {getCajasDetallesAll, getCajasDetallesEstados, getByFacturacion, getProductsMasVendidos, getProductsTotalesPorMes, postCajaDetalleImportar, postCajaDetalleUpdateFactura, postCajaDetalleCreate, postCajaDetalleUpdate, getCajaDetalle, postCajaDetalleDelete}
