const express = require('express')
const AllResturnts = express.Router()
const Resturant = require('../models/resturants')


AllResturnts.get('/', async (req, res) => {
    try {
        const rest = await Resturant.find()
        if (rest) return res.send({ "seccess": true, "lenght": rest.length, "result": rest })
        res.send({ "seccess": false, 'message': 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

AllResturnts.get('/open', async (req, res) => {
    try {
        let rest = await Resturant.find()
        if (rest) {
            rest = rest.filter(e => e.open)
            res.send({ "seccess": true, "lenght": rest.length, "result": rest })
            return
        }
        res.send({ "seccess": false, 'message': 'somthing went wrong' })

    } catch (error) {
        res.send(error)
    }
})

AllResturnts.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const rest = await Resturant.findById(id)
        if (rest) return res.send({ "success": true, "result": rest })
        res.send({ "seccess": false, 'message': 'somthing went wrong' })

    } catch (error) {
        res.send(error)
    }
})

AllResturnts.get('/close/:id', async (req, res) => {
    const { id } = req.params
    try {
        let rest = await Resturant.findById(id)
        rest.open = false
        let result = await Resturant.findByIdAndUpdate(id, rest)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ "seccess": false, 'message': 'somthing went wrong' })

    } catch (error) {
        res.send(error)
    }
})

AllResturnts.get('/open/:id', async (req, res) => {
    const { id } = req.params
    try {
        let rest = await Resturant.findById(id)
        rest.open = true
        let result = await Resturant.findByIdAndUpdate(id, rest)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ "seccess": false, 'message': 'somthing went wrong' })
    }
    catch (error) {
        res.send(error)
    }
})

AllResturnts.get('/all/remove', async (req, res) => {
    try {
        const rest = await Resturant.find()
        if (rest) {
            const body = { open: true }
            for (let i = 0; i < rest.length; i++) {
                let a = await Resturant.findByIdAndUpdate(rest[i]._id, body)
                console.log(a);
                console.log('good');
            }
            res.send('ok')
            return
        }
        res.send('none')
    } catch (error) {
        res.send(error)
    }
})

AllResturnts.post('/', async (req, res) => {
    const body = req.body
    body.discount = 0
    body.deliveryDiscount = 0
    body.freeDelivery = false
    body.menu = []
    body.minOrder = 0
    body.whorate = [],
        body.logo = ""
    body.stars = {
        index: 0,
        total: 0
    }
    body.open = false
    body.orders = 0
    body.openAndCloseTime = []
    body.paktype = 1
    try {
        const resturants = await Resturant.find()
        if (resturants.find(e => e.email == body.email)) return res.send({ "success": false, 'message': 'this email is allraedy exst' })
        const newresturant = await Resturant.create(body)
        if (newresturant) return res.send({ "success": true, 'result': newresturant })
        res.send({ "success": false, 'message': 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
})


AllResturnts.put('/update/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const update = await Resturant.findByIdAndUpdate(id, body)
        if (update) return res.send({ "success": true, 'result': update })
        res.send({ "success": false, 'message': 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

AllResturnts.put('/start/:id', async (req, res) => {
    const { id } = req.params
    const { userId } = req.body
    try {
        const result = await Resturant.findById(id)
        result.stars.index += 1
        result.stars.total += req.body.userRate
        result.whorate = [...result.whorate, userId]
        const final = await Resturant.findByIdAndUpdate(id, result)
        if (final) return res.send({ "success": true, 'result': final })
        res.send({ "success": false, 'message': 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

AllResturnts.get('/pak/:id', async (req, res) => {
    const { id } = req.params
    try {
        let result = await Resturant.find()
        console.log(result, id);
        result = result.filter(r => r.paktype == id)
        if (result) return res.send({ "success": true, "length": result.length, "result": result })
        res.send({ "success": false, 'message': 'somthing went wrong' })

    } catch (error) {
        res.send(error)

    }
})

AllResturnts.put('/pak', async (req, res) => {
    const { code } = req.body
    const { pack } = req.body
    const { resId } = req.body
    try {
        const result = await Resturant.findById(resId)
        result.paktype = pack
        if (code === "raouf") {
            const final = await Resturant.findByIdAndUpdate(resId, result)
            if (final) return res.send({ "success": true, 'result': final })
            res.send({ "success": false, 'message': 'no auoth' })
            return
        }
        res.send({ "success": false, 'message': 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
})


module.exports = AllResturnts