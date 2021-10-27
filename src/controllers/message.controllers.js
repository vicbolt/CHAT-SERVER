const models = require('../models/index.js')

const create = async (req, res) => {
    try{

        const { userOneId, userTwoId, userOwnerId, text } = req.body

        if(text.length === 0){
            return res.status(400).json({ error: 'Debe de existir un mensaje para poderlo enviar'})
        }
        const userOne = await models.user.findById(userOneId) //VALIDAMOS QUE EL USUARIO 1 EXISTA
        if(!userOne){
            return res.status(400).json({ error: 'El usuario uno no existe'})
        }

        const userTwo = await models.user.findById(userTwoId) //VALIDAMOS QUE EL USUARIO2 EXISTA
        if(!userTwo){
            return res.status(400).json({ error: 'El usuario dos no existe'})
        }

        const userOwner = await models.user.findById(userOwnerId) // VALIDAMOS QUE EL OWNER EXISTA
        if(!userOwner){
            return res.status(400).json({ error: 'El propietario del mensaje no existe'})
        }

        let message 

        const messages = await models.message.find({ userOne: userTwo, userTwo: userOne })
        if(messages.length === 0){
            message = await models.message.create({ 
                userOne,
                userTwo,
                userOwner,
                text
                })  
        } else {
            message = await models.message.create({ 
                userOne: userTwo,
                userTwo: userOne,
                userOwner,
                text
            })
        }


        return res.json({ message })




    } catch (error){
        return res.status(400).json({ error: 'No se ha podido crear el mensaje'})
    }
}

const chat = async (req, res) => {
    try{
        const { userOneId, userTwoId } = req.body

        const userOne = await models.user.findById(userOneId)
        if(!userOne){
            return res.status(400).json({ error: 'El usuario no existe'})
        }

        const userTwo = await models.user.findById(userTwoId)
        if(!userTwo){
            return res.status(400).json({ error: 'El usuario no existe'})
        }

        let result = []

        const userList1 = await models.message.find({
            userOne: userOne,
            userTwo: userTwo
            })
        if(userList1.length === 0){
            const userList2 = await models.message.find({ 
                userOne: userTwo,
                userTwo: userOne
            });

            if(userList2.length !== 0){
             result = userList2
            }
        } else {
                result = userList1
            }

        return res.json({ messages: result })

    } catch(error){
        return res.status(400).json({ error: 'No se ha podido obtener el chat'})
    }
}



const getAll = async (req, res) => {
    try{
        const messages = await models.message.find()
        return res.status(200).json({ messages })

    } catch(error){
        return res.status(400).json({ error: 'No se han podido obtener todos los mensajes'})
    }
}

module.exports = {
    create,
    getAll,
    chat
}