const Facturas = require('../models/facturas.model.js');
const getFacturasAll = (req, res) => {
    Facturas.find()  
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}
const postFacturaCreate = async (req, res) => {
    const data = req.body;
    let factura = await Facturas.find({ruc: data.ruc}).then(data => data);

    if(factura.length === 0 ){
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
    }else{
        res.json({add:true, id: factura[0]._id})
    }

}
module.exports = {getFacturasAll, postFacturaCreate}
