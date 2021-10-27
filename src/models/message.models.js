const { Schema, model } = require('mongoose')

const messageSchema = new Schema ({
    userOne:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userTwo:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true,
})

module.exports = model('Message', messageSchema)