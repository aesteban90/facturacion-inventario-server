const mongoose = require('mongoose');
const schema = new mongoose.Schema({ 
    descripcion: { type: String, required: true },
    user_created: { type: String, required: true },
    user_updated: { type: String, required: true }    
}, {timestamps: true})

module.exports = mongoose.model('CajasConfiguraciones',schema);

