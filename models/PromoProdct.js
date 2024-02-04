const mongoose = require('mongoose')


const promoprodct = new mongoose.Schema({
    name: String,
    img: String,
    discount: Number,
    storid: String,
    pastPrice: Number,
    nowPrice: Number,
})

const Promoprodct = mongoose.model('Promoprodct', promoprodct)

module.exports = Promoprodct