const router = require('express').Router();
let User = require('../models/usuarios.model.js');
const jwt = require('jsonwebtoken');

// router.route('/').post((req,res) => {
const autenticar = (req,res) =>{ 
    User.findOne(
        {nickname: req.body.nickname},
        async function(err, user){
            if(err) throw err;
            if(user){
                try {
                    //Verifica si coincide el password                        
                    const doesPasswordMatch = (req.body.password === user.password ? true : false);                    
                    //if the passwords do not match
                    if(!doesPasswordMatch) return res.json({ type:'errpass',msg: '!Password no coincide' });
                  
                    const key = process.env.JWTKEY;
                    const payload = {
                        id: user._id,
                        nickname: user.nickname,
                        nombre_completo: user.nombre_completo,
                        roles: user.roles
                    }
                    const token = jwt.sign(payload, key);
                    res.send({token});
                    
                } catch (error) {
                    console.log(error)        
                }
            }else{
                res.json({ type:'erruser',msg: '!Usuario no registrado' });
            }            
        }
    )
}

module.exports = { autenticar }
