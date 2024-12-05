const mongoose = require('mongoose');
const {Schema} = mongoose;
const schema = new mongoose.Schema({ 
    caja: { type: Schema.Types.ObjectId, ref: 'Cajas', required: true },
    inventario: { type: Schema.Types.ObjectId, ref: 'Inventarios', required: true },
    factura: { type: Schema.Types.ObjectId, ref: 'Facturas' },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: false },
    precioIva5: { type: Number, required: false },
    precioIva10: { type: Number, required: false },
    total: { type: Number, required: true },
    subtotalIva5: { type: Number, required: false },
    subtotalIva10: { type: Number, required: false },
    totalIva5: { type: Number, required: false },
    talIva10: { type: Number, required: false },
    talIva: { type: Number, required: false },
    estado: { type: String, required: true },  //Agregado, Facturado
    user_created: { type: String, required: true },
    user_updated: { type: String, required: true } ,
    created_at: {type: Date},
    updated_at: {type: Date}
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('CajasDetalles',schema);

