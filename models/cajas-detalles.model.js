const mongoose = require('mongoose');
const {Schema} = mongoose;
const schema = new mongoose.Schema({ 
    caja: { type: Schema.Types.ObjectId, ref: 'Cajas', required: true },
    inventario: { type: Schema.Types.ObjectId, ref: 'Inventarios', required: true },
    factura: { type: Schema.Types.ObjectId, ref: 'Facturas' },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    total: { type: Number, required: true },
    estado: { type: String, required: true },  //Agregado, Facturado
    user_created: { type: String, required: true },
    user_updated: { type: String, required: true } ,
    created_at: {type: Date},
    updated_at: {type: Date}
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('CajasDetalles',schema);

