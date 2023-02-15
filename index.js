const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const autenticar = require('./routes/autenticar.js')
const usuarios = require('./routes/usuarios.js');
const inventarios = require('./routes/inventarios.js');
const proveedores = require('./routes/proveedores.js');
const compras = require('./routes/compras.js');
const roles = require('./routes/roles.js');
const cajas = require('./routes/cajas.js');
const cajas_detalles = require('./routes/cajas-detalles.js');
const cajas_configuraciones = require('./routes/cajas-configuraciones.js');
const clientes = require('./routes/clientes.js');

const app = express();
app.use(cors());
app.use(express.json());  

app.use('/authenticate', autenticar);
app.use('/usuarios', usuarios); 
app.use('/inventarios', inventarios); 
app.use('/proveedores', proveedores); 
app.use('/compras', compras); 
app.use('/roles', roles); 
app.use('/cajas', cajas); 
app.use('/cajas-detalles', cajas_detalles);
app.use('/cajas-config', cajas_configuraciones); 
app.use('/clientes', clientes); 

 
const CONNECTION_URL = process.env.MONGODB;
const PORT = process.env.PORT || 5004;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true})
    .then(() => app.listen(PORT,  () => {console.log(`Server is running on port: ${PORT}`)}))
    .then(console.log('Database is connected'))
    .catch((error) => console.log(error));

module.exports = app;