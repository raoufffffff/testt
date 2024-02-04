const express = require('express')
const OrderRoute = express.Router()
const Order = require('../models/Oder')
const Livror = require('../models/livror')
const Resturant = require('../models/resturants')
const Store = require('../models/Store')
const User = require('../models/user')
const { BeforCheckOrder } = require('../MidelWere/OrderMiderWere')

OrderRoute.get('/', async (req, res) => {
    try {
        const result = await Order.find()
        if (result) return res.send({ "success": true, 'length': result.length, 'result': result })
        res.send({ "success": false, "message": 'not faound' })
    } catch (error) {
        res.send(error)
    }
})

OrderRoute.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await Order.findById(id)

        if (result) return res.send({ "success": true, 'result': result })
        res.send({ "success": false, "message": 'not faound' })
    } catch (error) {
        res.send(error)
    }
})

OrderRoute.post('/', BeforCheckOrder, async (req, res) => {
    try {
        let result = await Order.find()
        let a = []
        setTimeout(() => {
            result.forEach(e => {
                if (Date.now() - e.createdAt.getTime() > 10 * 60 * 1000) {
                    a.push(e)
                } else {
                    console.log('hello');
                }
            })
            hello()
        }, 600000);
        const hello = async () => {
            try {
                for (let i = 0; i < a.length; i++) {
                    a[i].Cancelled = true
                    a[i].IsServerCancelled = true
                    a[i].numberOfCanceling += 1
                    a[i].whyCancelled = {
                        whoCancelled: 'server',
                        why: 'past 30s'
                    }
                    let ab = await Order.findOneAndUpdate(a[i]._id, a[i])
                }
            } catch (error) {
                console.log('tnakhet');
            }
        }

    } catch (error) {
        console.log('tnakhet siryou');
    }

})

OrderRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Order.findByIdAndDelete(id)
        if (result) return res.send({ "success": true, 'result': result })
        res.send({ "success": false, "message": 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

OrderRoute.get('/available/true', async (req, res) => {
    try {
        const result = await Order.find()
        const availableOrders = result.filter(e => e.IsAvailable && !e.IsLivrorAccepts && !e.Cancelled)
        res.send({ "success": true, 'lenght': availableOrders.length, 'result': availableOrders })
    } catch (error) {
        res.send(error)
    }
})

// livror with order
OrderRoute.put('/livror/:id', async (req, res) => {
    const { id } = req.params
    const livrorid = req.body.livrorid
    try {
        let focusOrder = await Order.findById(id)
        let livror = await Livror.findById(livrorid)
        if (!livror) {
            res.send({ "success": false, 'message': 'you can not do this' })
            return
        }
        if (focusOrder.IsAvailable === false && focusOrder.Cancelled != true) {
            res.send({ "success": false, 'message': 'this order is not available' })
            return
        }
        livror.orders += 1
        focusOrder.IsAvailable = false
        focusOrder.IsLivrorAccepts = true
        focusOrder.livrorId = livrorid
        focusOrder.livrorTel = livror.tel
        const result = await Order.findByIdAndUpdate(id, focusOrder)
        const resultliv = await Livror.findByIdAndUpdate(livrorid, livror)
        if (result) return res.send({ "success": true, 'message': 'you can do it', "result": result })
        res.send({ "success": false, "message": 'sothing went wrong' })

    } catch (error) {
        res.send(error)
    }
})

// same livror cancel 
OrderRoute.put('/livrorcancel/:id', async (req, res) => {
    const { id } = req.params
    const livrorid = req.body.livrorid
    const userNotResponds = req.body.userNotResponds
    const cose = req.body.cose
    try {
        let order = await Order.findById(id)
        let livror = await Livror.findById(livrorid)
        console.log(order);
        if (!order) {
            res.send({ "success": false, 'message': 'something went wrong' })
            return
        }
        if (!livror) {
            res.send({ "success": false, 'message': 'you can not do this' })
            return
        }
        if (order.livrorId == livror._id) {
            if (userNotResponds) {
                order.userNotResponds = true
                order.Cancelled = true
                order.numberOfCanceling += 1
                order.whyCancelled = [{
                    whocancel: livror._id,
                    cose: "the user not responding"
                }, ...order.whyCancelled]
                livror.cancelOrders += 1
                livror.orders -= 1
                const livrorResult = await Livror.findByIdAndUpdate(livrorid, livror)
                const result = await Order.findByIdAndUpdate(id, order)
                // user isso
                const user = await User.findById(order.user.userId)
                if (!user) return res.send({ "success": false, 'message': 'somthing went wrong' })
                user.cancelOrders += 1
                let b = await User.findByIdAndUpdate(user._id, user)
                res.send({ "success": true, "message": "we are vary soory for this order" })
                return
            }
            order.IsAvailable = true
            order.IsLivrorAccepts = false
            order.livrorId = ""
            order.livrorTel = ""
            order.numberOfCanceling += 1
            livror.cancelOrders += 1
            livror.orders -= 1
            order.whyCancelled = [{
                whocancel: livror._id,
                cose: cose
            }, ...order.whyCancelled]
            const result = await Order.findByIdAndUpdate(id, order)
            const livrorResult = await Livror.findByIdAndUpdate(livrorid, livror)
            res.send({ "success": true, "message": "cancel is successful" })
            return
        }
        res.send({ "success": false, "message": "something went wrong" })
    } catch (error) {
        res.send(error)
    }
})

// order with restuarnts and stors

OrderRoute.put('/res/:id', async (req, res) => {
    const resid = req.body.resid
    const { id } = req.params
    try {
        let order = await Order.findById(id)
        if (!order) return res.send({ "success": false, 'message': "order not faound" })
        if (resid == order.receives.receivesId) {
            let rest;
            if (order.receives.receivesType === 'store') {
                rest = await Store.findById(order.receives.receivesId)
            } else {
                rest = await Resturant.findById(order.receives.receivesId)
            }
            if (!rest) return res.send({ "success": false, 'message': 'something went wrong' })
            order.IsReceivesAccepts = true
            const a = await Order.findByIdAndUpdate(id, order)
            res.send({ "success": true, 'message': "successfully" })
            return
        }
        res.send({ "success": false, 'message': "the order it's not sending for you" })
    } catch (error) {
        res.send(error)
    }
})

// order cancel with restuarnts and stors
OrderRoute.put('/rescancel/:id', async (req, res) => {
    const { id } = req.params
    const restid = req.body.restid
    const userNotResponds = req.body.userNotResponds
    const cose = req.body.cose
    try {
        let order = await Order.findById(id)
        if (!order) return res.send({ "success": false, 'message': "order not faound" })
        if (restid == order.receives.receivesId) {
            let rest;
            if (order.receives.receivesType === 'store') {
                rest = await Store.findById(order.receives.receivesId)
                if (!rest) return res.send({ "success": false, 'message': 'something went wrong' })
                if (userNotResponds) {
                    rest.orders -= 1
                    let a = await Store.findByIdAndUpdate(restid, rest)
                    order.userNotResponds = true
                    order.Cancelled = true
                    order.numberOfCanceling += 1
                    order.whyCancelled = [{
                        whocancel: rest._id,
                        cose: "the user not responding"
                    }, ...order.whyCancelled]
                    const result = await Order.findByIdAndUpdate(id, order)
                    // user isso
                    const user = await User.findById(order.user.userId)
                    if (!user) return res.send({ "success": false, 'message': 'somthing went wrong' })
                    user.cancelOrders += 1
                    let b = await User.findByIdAndUpdate(user._id, user)
                    res.send({ "success": true, "message": "we are vary soory for this order" })
                    return
                }
            } else {
                rest = await Resturant.findById(order.receives.receivesId)
                if (!rest) return res.send({ "success": false, 'message': 'something went wrong' })
                if (userNotResponds) {
                    rest.orders -= 1
                    let a = await Resturant.findByIdAndUpdate(restid, rest)
                    order.userNotResponds = true
                    order.Cancelled = true
                    order.numberOfCanceling += 1
                    order.whyCancelled = [{
                        whocancel: rest._id,
                        cose: "the user not responding"
                    }, ...order.whyCancelled]
                    const result = await Order.findByIdAndUpdate(id, order)
                    // user isso
                    const user = await User.findById(order.user.userId)
                    if (!user) return res.send({ "success": false, 'message': 'somthing went wrong' })
                    user.cancelOrders += 1
                    let b = await User.findByIdAndUpdate(user._id, user)
                    res.send({ "success": true, "message": "we are vary soory for this order" })
                    return
                }
            }
            order.Cancelled = true
            order.IsReceivesAccepts = false
            order.whyCancelled = [{
                whocancel: restid,
                cose: cose
            }, ...order.whyCancelled]
            const result = await Order.findByIdAndUpdate(id, order)
            res.send({ "success": true, "result": result })
            return
        }
        res.send({ "success": false, 'message': "the order it's not sending for you" })
    } catch (error) {
        res.send(error)
    }
})

// user with order cancekked


OrderRoute.put('/usercancell/:id', async (req, res) => {
    const { id } = req.params;
    const userid = req.body.userid;
    const cose = req.body.cose;

    try {
        let order = await Order.findById(id);
        let user = await User.findById(userid); // Corrected: Missing await here

        if (!order || !user) {
            return res.send({ "success": false, "message": "something went wrong" }); // Corrected typo: "sothing" to "something"
        }

        if (order.Cancelled) {
            return res.send({ "success": false, "message": 'the order is already cancelled' });
        }

        order.Cancelled = true;
        order.IsAvailable = false;
        order.numberOfCanceling += 1;
        order.whyCancelled = [{
            who: user._id,
            cose: cose
        }, ...order.whyCancelled];

        user.cancelOrders += 1;

        // Corrected: Use findByIdAndUpdate with the ID and the update data
        const result = await Order.findByIdAndUpdate(id, order, { new: true });
        const finalResult = await User.findByIdAndUpdate(userid, user, { new: true }); // Corrected: Use the user ID and update data

        if (result && finalResult) {
            return res.send({ "success": true });
        }

        res.send({ "success": false, "message": "something went wrong" });
    } catch (error) {
        res.send(error);
    }
});



// OrderRoute.put('/usercancell/:id', async (req, res) => {
//     const { id } = req.params
//     const userid = req.body.userid
//     const cose = req.body.cose
//     try {
//         let order = await Order.findById(id)
//         let user = await User.findById(userid)
//         if (!order || !user) return res.send({ "message": "sothing went wront" })
//         if (order.Cancelled) return res.send({ "message": 'the order is allready cancelled' })

//         order.Cancelled = true
//         order.IsAvailable = false
//         order.numberOfCanceling += 1
//         order.whyCancelled = [{
//             who: user._id,
//             cose: cose
//         }, ...order.whyCancelled]
//         user.cancelOrders += 1
//         const result = await Order.findByIdAndUpdate(order)
//         const finalResult = await User.findByIdAndUpdate(user)
//         if (result && finalResult) return res.send({ "success": true })
//         res.send({ "message": "sothing went wront" })
//     } catch (error) {
//         res.send(error)
//     }
// })

module.exports = OrderRoute