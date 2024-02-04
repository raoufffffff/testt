const moongose = require('mongoose')

const stor = new moongose.Schema({
    name: String,
    orders: Number,
    coords: {
        "latitude": Number,
        "longitude": Number
    },
    img: String,
    city: String,
    state: String,
    cancelOrders: Number,
    open: Boolean,
    openAndCloseTime: [],
    minOrder: Number,
    deliveryDiscount: Number,
    type: String,
    openAndCloseTime: [],
    stars: {
        index: Number,
        total: Number
    },
    product: [],
    OfferProdct: [],
    tel: String,
    whorate: [],
    logo: String,
    email: String,
    password: String
})

const Store = moongose.model('Store', stor)

module.exports = Store