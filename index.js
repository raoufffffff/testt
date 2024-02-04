const express = require('express')
const cors = require('cors')
const moongose = require('mongoose')
const app = express()
const AllResturnts = require('./routes/resturantRoute')
const ads = require('./routes/ads')
const foodroute = require('./routes/food')
const StorProductRoute = require('./routes/storProduct')
const FoodPackRoute = require('./routes/FoodPack')
const UserRoote = require('./routes/UserRoote')
const LivrorRoute = require('./routes/livror')
const StoreRoute = require('./routes/Store')
const OrderRoute = require('./routes/OrderRoute')
const PromoRoute = require('./routes/PromoProdct')
const Auth = require('./auth/auth')
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 7000

// user and livrors and resturants and stors
app.use('/livror', LivrorRoute)
app.use('/user', UserRoote)
app.use('/resturant', AllResturnts)
app.use('/stor', StoreRoute)
// prodct and foods
app.use('/food', foodroute)
app.use('/foodPack', FoodPackRoute)
app.use('/storProduct', StorProductRoute)
app.use('/promoRoute', PromoRoute)
// ads
app.use('/ads', ads)
// order
app.use('/order', OrderRoute)
// auth
app.use('/auth', Auth)

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(PORT)

moongose
    .connect('mongodb+srv://raoufhamoudi1999:wweraw22@cluster0.7vncoe4.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("mriglla")

    })
    .catch(err => console.log(err))



module.exports = app

