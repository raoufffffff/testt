const moongose = require('mongoose')

const livror = new moongose.Schema({
    name: String,
    tel: String,
    email: String,
    orders: Number,
    cancelOrders: Number,
    online: Boolean,
    whorate: [],
    stars: {
        index: Number,
        total: Number
    },
    password: String,
    timing: []
})

const Livror = moongose.model("livror", livror)

module.exports = Livror