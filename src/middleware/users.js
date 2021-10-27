const jwt = require('jsonwebtoken')
const config= require('../config')

const isValid = (req, res, next) => {
    const { token } = req.headers
    console.log({token})
    if(!token){
        return res.json({ error: 'No tienes acceso '})
    }

    const data = jwt.verify(token, config.jwt.secret)
    if(!data){
        return res.json({ error: 'No tienes acceso '})
    }
    
    // if(data.admin !== true){

    // }

    next()
}


module.exports = {
    isValid
}