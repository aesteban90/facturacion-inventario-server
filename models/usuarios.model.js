const mongoose = require('mongoose');
const schema = new mongoose.Schema({ 
    nickname: { type: String, required: true},
    nombre_completo: { type: String, required: true },
    password: { type: String, required: true }, 
    roles: [String],
    user_created: { type: String, required: true },
    user_updated: { type: String, required: true }    
}, {timestamps: true})
module.exports = mongoose.model('Usuarios',schema);