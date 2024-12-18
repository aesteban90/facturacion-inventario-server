const mongoose = require('mongoose');
const schema = new mongoose.Schema({ 
    codigo: { type: String, required: true }, 
    descripcion: { type: String, required: true }, 
    cantidad: { type: Number }, 
    precio_costo: { type: Number },  
    precio_venta: { type: Number },
    tipoImpuesto: { type: Number, required: false }, //0=IVA 10%, 1=IVA 5%, 2= Excentas
    notificar_cantidad_minima: { type: Number },  
    user_created: { type: String, required: true },
    user_updated: { type: String, required: true }    
}, {timestamps: true})

schema.index({codigo: -1},{unique: true})
module.exports = mongoose.model('Inventarios',schema);
