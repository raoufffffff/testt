const moongose = require('mongoose')

const foodpack = new moongose.Schema({
    name: String,
    ownerid: String,
    pastPrice: Number,
    nowPrice: Number,
    img: String,
    description: String,
    discount: Number
})

const FoodPack = moongose.model("foodpack", foodpack)

module.exports = FoodPack