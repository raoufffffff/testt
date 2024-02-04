const Order = require("../models/Oder")
const Resturant = require("../models/resturants")
const User = require("../models/user")


const BeforCheckOrder = async (req, res, next) => {
    const body = req.body
    body.livrorId = ''
    body.IsAvailable = true
    body.IsReceivesAccepts = false
    body.IsLivrorAccepts = false
    body.Cancelled = false
    body.whyCancelled = []
    body.numberOfCanceling = 0
    try {
        const result = await Order.create(body)
        let rest;
        if (result.receives.receivesType === 'store') {
            const rest = await Store.findById(result.receives.receivesId)
            rest.orders += 1
            const a = await Store.findByIdAndUpdate(result.receives.receivesId, rest)
        } else {
            const rest = await Resturant.findById(result.receives.receivesId)
            rest.orders += 1
            const a = await Resturant.findByIdAndUpdate(result.receives.receivesId, rest)
        }
        let user = await User.findById(result.user.userId)
        if (!user) return res.send({ "success": false, "message": 'somthing went wrong' })
        user.orders += 1
        if (body.receives.receivesType != 'store') {
            user.FavoriteFood = [body.Contents, ...user.FavoriteFood]
        }
        user.restAndStors = [body.receives.receivesId, ...user.restAndStors]
        const a = await User.findByIdAndUpdate(result.user.userId, user)
        if (result) {
            res.send({ "success": true, 'result': result, "user": a })
            next()
            return
        }
        res.send({ "success": false, "message": 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
}


module.exports = { BeforCheckOrder }

// const body = req.body
// body.livrorId = ''
// body.IsAvailable = true
// body.IsReceivesAccepts = false
// body.IsLivrorAccepts = false
// body.Cancelled = false
// body.whyCancelled = []
// body.numberOfCanceling = 0
// try {
//     const result = await Order.create(body)
//     let rest;
//     if (result.receives.receivesType === 'store') {
//         const rest = await Store.findById(result.receives.receivesId)
//         rest.orders += 1
//         const a = await Store.findByIdAndUpdate(result.receives.receivesId, rest)
//     } else {
//         const rest = await Resturant.findById(result.receives.receivesId)
//         rest.orders += 1
//         const a = await Resturant.findByIdAndUpdate(result.receives.receivesId, rest)
//     }
//     if (result) {
//         res.send({ "success": true, 'result': result })
//         let user = await User.findById(result.user.userId)
//         user.orders += 1
//         if (body.receives.receivesType != 'store') {
//             user.FavoriteFood = [body.Contents, ...user.FavoriteFood]
//         }
//         user.restAndStors = [body.receives.receivesId, ...user.restAndStors]
//         const a = await User.findByIdAndUpdate(result.user.userId, user)
//         return
//     }
//     res.send({ "success": false, "message": 'somthing went wrong' })
// } catch (error) {
//     res.send(error)
// }