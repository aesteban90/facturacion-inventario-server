const mongoose = require('mongoose');
const {Schema} = mongoose;
const schema = new mongoose.Schema({ 
    cajaConf: { type: Schema.Types.ObjectId, ref: 'CajasConfiguraciones', required: true },
    montoApertura: { type: Number, required: true }, 
    montoCierre: { type: Number},   
    estado: { type: String, required: true },  
    fechaApertura: {type: Date, required: true},
    fechaCierre: {type: Date},
    user_created: { type: String, required: true },
    user_updated: { type: String, required: true }    
}, {timestamps: true})

module.exports = mongoose.model('Cajas',schema);

