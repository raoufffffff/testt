const mongoose = require('mongoose');

const ads = new mongoose.Schema({
    for: String,
    forid: String,
    imgs: String
})

const Ads = mongoose.model('ads', ads);




module.exports = Ads;
