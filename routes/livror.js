const express = require('express')
const LivrorRoute = express.Router()
const Livror = require('../models/livror')

LivrorRoute.get('/', async (req, res) => {
    try {
        const result = await Livror.find()
        if (result) return res.send({ "success": true, 'lenght': result.length, 'result': result })
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

LivrorRoute.get('/online', async (req, res) => {
    try {
        let result = await Livror.find()
        if (result) {
            result = result.filter(e => e.online)
            res.send({ "success": true, "lenght": result.length, "result": result })
            return
        }
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

LivrorRoute.get('/offline/:id', async (req, res) => {
    const { id } = req.params
    try {
        let rest = await Livror.findById(id)
        if (rest) {
            if (rest.online) {
                rest.online = false
                rest.timing = [{
                    type: 'close',
                    tiem: ` ${new Date().getUTCFullYear()}/${new Date().getUTCMonth()}/${new Date().getUTCDay()}/${new Date().getUTCHours() + 1}:${new Date().getUTCMinutes()}`
                }, ...rest.timing]
                let result = await Livror.findByIdAndUpdate(id, rest)
                res.send({ "success": true, "result": result })
                return
            }
            res.send({ "success": false, 'message': 'you are alaedy online' })
            return
        }
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

LivrorRoute.get('/open/:id', async (req, res) => {
    const { id } = req.params
    try {
        let rest = await Livror.findById(id)
        if (rest) {
            if (!rest.online) {
                rest.online = true
                rest.timing = [{
                    type: 'open',
                    tiem: ` ${new Date().getUTCFullYear()}/${new Date().getUTCMonth()}/${new Date().getUTCDay()}/${new Date().getUTCHours() + 1}:${new Date().getUTCMinutes()}`
                }, ...rest.timing]
                let result = await Livror.findByIdAndUpdate(id, rest)
                res.send({ "success": true, "result": result })
                return
            }
            res.send({ "success": false, 'message': 'you are alaedy online' })
            return
        }
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

LivrorRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Livror.findById(id)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

LivrorRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const result = await Livror.findByIdAndUpdate(id, body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

LivrorRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Livror.findByIdAndDelete(id)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

LivrorRoute.post('/', async (req, res) => {
    let body = req.body
    body.orders = 0
    body.cancelOrders = 0
    body.online = false
    body.whorate = []
    try {
        const livrors = await Livror.find()
        if (livrors.find(e => e.email == body.email)) return res.send({ "success": false, 'message': 'this email is allraedy exst' })
        const result = await Livror.create(body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})



module.exports = LivrorRoute