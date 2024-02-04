const moongose = require('mongoose')

const user = new moongose.Schema({
    name: String,
    email: String,
    tel: String,
    orders: Number,
    cancelOrders: Number,
    FavoriteFood: [],
    Favorite: [],
    restAndStors: [],
    reating: [],
    password: String
})


const User = moongose.model("User", user)

module.exports = User