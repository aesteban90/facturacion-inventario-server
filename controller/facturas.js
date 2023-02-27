const Facturas = require('../models/facturas.model.js');
const getFacturasAll = (req, res) => {
    Facturas.find()  
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}
const postFacturaCreate = (req, res) => {
    const data = req.body;
    const newData = new Facturas({
        ruc: data.ruc,
        razonSocial: data.razonSocial,
        timbrado: data.timbrado,
        numeroComprobante: data.numeroComprobante,
        recibido: data.recibido,
        total: data.total,
        vuelto: data.vuelto,
        user_created: data.user_created,
        user_updated: data.user_updated
        })

    newData.save()
        .then((data) => {
            res.json({add:true, id: data._id})
        })
        .catch(err => {console.log(err); res.status(400).json({add:false, message:err})});

}
module.exports = {getFacturasAll, postFacturaCreate}
