
const mongoose = require('mongoose');
const {Schema} = mongoose;
const schema = new mongoose.Schema({ 
    numero: { type: String, required: true },
    ruc: { type: String, required: true },
    nombreEmpresa: { type: String, required: true },
    vencimiento: { type: Date, required: true },
    estado: { type: String},//activado o desactivado
    user_created: { type: String, required: true },
    user_updated: { type: String, required: true }
}, {timestamps: true})

module.exports = mongoose.model('Timbrados',schema);

