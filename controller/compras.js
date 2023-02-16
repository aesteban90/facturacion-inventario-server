const Compras = require('../models/compras.model.js');
const Inventario = require('../models/inventarios.model.js');
const { convertMiles } = require('../utils/utils.js');
const getComprasAll = (req, res) => {
    Compras.find().populate('inventario').populate('proveedor')
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}

const postCompraCreate = async (req, res) => {
    const data = req.body;    
    const newData = new Compras({
        numerofactura: data.numerofactura,
        inventario: data.inventario,
        proveedor: data.proveedor,
        fecha_compra: data.fecha_compra,
        cantidad: data.cantidad.replace(/\./gi,''),
        costo: data.costo.replace(/\./gi,''),
        total: data.total,
        user_created: data.user_created,
        user_updated: data.user_updated
        })
    await newData.save()
        .then(() => res.json({add:true}))
        .catch(err => {console.log(err); res.status(400).json({add:false, message:err})});

    //Calculando el precio ponderado en el inventario
    calcularPrecioPonderado(data.inventario, parseInt(newData.cantidad))
    
}
const postCompraUpdate = (req, res) => {    
    let cantidad_compra = 0;
    Compras.findById(req.params.id)
        .then(data => {       
            //Obtiene la cantidad anterior para restarlo del inventario
            cantidad_compra = parseInt(data.cantidad) * -1;

            data.fecha_compra =  req.body.fecha_compra,
            data.numerofactura = req.body.numerofactura;
            data.inventario = req.body.inventario;
            data.proveedor = req.body.proveedor;
            data.cantidad = req.body.cantidad.replace(/\./gi,'');
            data.costo = req.body.costo.replace(/\./gi,'');
            data.total = req.body.total;
            data.user_updated = req.body.user_updated;

            //suma la nueva cantidad
            cantidad_compra += parseInt(data.cantidad)
           
            data.save()
                .then((data) => {
                    
                    //Calculando el precio ponderado en el inventario
                    calcularPrecioPonderado(data.inventario, cantidad_compra)
                    
                    res.json({update: true})
                })                
                .catch(err => {console.log(err); res.status(400).json({update:false, message:err})});
        })
        .catch(err => {console.log(err); res.status(400).json({update:false, message:err})});
}
const getCompra = (req, res) => {
    Compras.findById(req.params.id)
        .then(data => {res.json(data)})
        .catch(err => res.status(400).json('Error: '+err));
}
const postCompraDelete = (req, res) => {
    Compras.findByIdAndDelete(req.params.id)
        .then(data => {
           
            //Calculando el precio ponderado en el inventario y resta la cantidad en el inventario
            calcularPrecioPonderado(data.inventario, parseInt(data.cantidad) * -1)
            
            res.json({delete: true})
        })
        .catch(err => res.status(400).json({delete: true, message: err}));

        
}
const calcularPrecioPonderado = async (inventario, cantidad_compra) =>{
    let cantidadtotal = 0;
    let costototal = 0;
    await Compras.find({inventario})
        .then(data => { 
            data.map( compra => {
                cantidadtotal += parseInt((compra.cantidad+"").replace(/\./gi,''));
                costototal += parseInt((compra.total+"").replace(/\./gi,''))
            })            
        })
        .catch(err => { console.log(err)})    

    
    //Calcula el precio ponderado de todas las compras del mismo producto
    let costoponderado = costototal / cantidadtotal;
    if(costototal === 0 || cantidadtotal === 0 ) costoponderado = 0;
    
        
    //Actualiza el inventario( suma la cantidad disponible y calcula el precio ponderado)
    Inventario.findById( inventario)
        .then(data => {        
            let cantidad = (data.cantidad === "" ? 0 : parseInt(data.cantidad))
            data.precio_costo = (Math.ceil(costoponderado)),
            data.cantidad = (cantidad + cantidad_compra);
            data.save()
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

module.exports = {getComprasAll, postCompraCreate, postCompraUpdate, getCompra, postCompraDelete}
