const mongoose = require('mongoose');
const {Schema} = mongoose;
const schema = new mongoose.Schema({ 
    numerofactura: { type: String, required: true }, 
    inventario: { type: Schema.Types.ObjectId, ref: 'Inventarios', required: true },    
    proveedor: { type: Schema.Types.ObjectId, ref: 'Proveedores', required: true },    
    cantidad: { type: Number, required: true },  
    fecha_compra: {type: Date, required: true},
    costo: { type: Number, required: true },  
    total: { type: Number, required: true },  
    user_created: { type: String, required: true },
    user_updated: { type: String, required: true }    
}, {timestamps: true})

module.exports = mongoose.model('Compras',schema);

