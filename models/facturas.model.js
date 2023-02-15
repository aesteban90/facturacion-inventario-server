
const mongoose = require('mongoose');
const {Schema} = mongoose;
const schema = new mongoose.Schema({ 
    cliente: { type: Schema.Types.ObjectId, ref: 'Clientes', required: true },
    recibido: { type: Number, required: true },
    total: { type: Number, required: true },
    vuelto: { type: Number, required: true },
    user_created: { type: String, required: true },
    user_updated: { type: String, required: true }
}, {timestamps: true})

module.exports = mongoose.model('Facturas',schema);

