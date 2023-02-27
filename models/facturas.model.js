
const mongoose = require('mongoose');
const {Schema} = mongoose;
const schema = new mongoose.Schema({ 
    ruc: { type: String, required: true },
    razonSocial: { type: String, required: true },
    timbrado: { type: Number, required: true },
    numeroComprobante:  { type: String, required: true },
    recibido: { type: Number },
    total: { type: Number, required: true },
    vuelto: { type: Number },
    user_created: { type: String, required: true },
    user_updated: { type: String, required: true }
}, {timestamps: true})

module.exports = mongoose.model('Facturas',schema);

