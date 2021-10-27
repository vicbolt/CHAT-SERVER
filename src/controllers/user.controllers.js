const models = require("../models/index")

const jwt = require('jsonwebtoken')
const config = require('../config')
const helpers = require('../helpers')

const create = async (req, res) => {

    try{
        const { email, password1, password2} = req.body;

        if(!email || !password1 || !password2 ) {
            return res.status(400).json({ error: 'Se deben de rellenar todos los campos'})
        }

        if(password1 !== password2){
            return res.status(400).json({ error: 'Las contraseñas no coinciden'})
        }

        const userExist = await models.user.findOne({email})
        if(userExist){
            return res.status(400).json({ error: 'El usuario ya esta registrado'})
        }

        const hash = await helpers.bcrypt.encrypt(password1)

        const user = await models.user({ email, password: hash})
        user.save()
        console.log({user})
        return res.status(201).json({ msg: "El usuario se ha creado con exito, inicie sesión para continuar" })
        

    } catch (error){
        return res.status(400).json({ error: 'User has not been created'})
    }
   
}

const getAll = async (req,res)=>{
    try{
        const data = jwt.verify(req.headers.token, config.jwt.secret)    //LAS SIGUIENTES LINEAS SON PARA QUE NO NOS SALGA NUESTRO USUARIO CUANDO SE CARGEN TODOS LOS DEMÁS
        const users = await models.user.find({ _id: {$ne: data.user._id }})
        return res.status(201).json({ users })

    } catch(_){
        return res.status(400).json({ error: ' No se han podido obtener todos los usuarios '})
    }
}

const login = async (req, res) => {
    
    try{
        const { email, password } = req.body

        const user = await models.user.findOne({email})
        
        if(!user){
            return res.json({ error: 'El usuario no esta registrado'})
            
        }

        const isValid = await helpers.bcrypt.compare(password, user.password)

        if(!isValid){
            return res.json({ error: 'La contraseña es incorrecta'})
        }

        const token = jwt.sign({ user }, config.jwt.secret)
        

        return res.json({ token, userId: user._id })

    }catch (error) {
        return res.json({ error: ' No se ha podido iniciar sesión'})
    }
}

module.exports = {
    create,
    getAll,
    login,
}