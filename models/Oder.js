const moongose = require('mongoose')


const order = new moongose.Schema({
    user: {
        userId: String,
        userName: String,
        userTel: String,
        userCoords: {
            "latitude": Number,
            "longitude": Number
        }
    },
    receives: {
        receivesName: String,
        receivesId: String,
        receivesTel: String,
        receivesCoords: {
            "latitude": Number,
            "longitude": Number
        },
        receivesType: String
    },
    livrorId: String,
    livrorTel: String,
    price: Number,
    Contents: [],
    IsAvailable: Boolean,
    IsReceivesAccepts: Boolean,
    IsLivrorAccepts: Boolean,
    whyCancelled: [],
    body: String,
    numberOfCanceling: Number,
    userNotResponds: Boolean,
    IsServerCancelled: Boolean,
    Cancelled: Boolean,
    successful: Boolean,
    createdAt: {
        type: Date,
        default: Date.now, // Sets the default value to the current timestamp
    },
    delevrycost: Number
})

const Order = moongose.model('Order', order)

module.exports = Order