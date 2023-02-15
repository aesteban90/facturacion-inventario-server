
const mongoose = require('mongoose');
const schema = new mongoose.Schema({ 
    rol: { type: String, required: true }, 
    descripcion: { type: String, required: true }  
}, {timestamps: true})

module.exports = mongoose.model('Roles',schema);

