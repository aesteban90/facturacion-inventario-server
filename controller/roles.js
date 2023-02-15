const Roles = require('../models/roles.model.js');
const getRolesAll = (req, res) => {
    Roles.find()  
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: '+ err));
}
module.exports = {getRolesAll}