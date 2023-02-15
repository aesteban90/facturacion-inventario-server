
const mongoose = require('mongoose');
const schema = new mongoose.Schema({ 
    ruc: { type: String, required: true }, 
    div: { type: String, required: true }, 
    razonsocial: { type: String, required: true },  
    user_created: { type: String, required: true },
    user_updated: { type: String, required: true }    
}, {timestamps: true})

module.exports = mongoose.model('Proveedores',schema);

