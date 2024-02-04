const express = require('express')
const Store = require('../models/Store')
const StoreRoute = express.Router()

StoreRoute.get('/', async (req, res) => {
    try {
        const result = await Store.find()
        if (result) return res.send({ "success": true, "lenght": result.length, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

StoreRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Store.findById(id)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'not faound' })
    } catch (error) {
        res.send(error)
    }
})

StoreRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Store.findByIdAndDelete(id)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'not faound' })
    } catch (error) {
        res.send(error)
    }
})


StoreRoute.post('/', async (req, res) => {
    const body = req.body
    body.deliveryDiscount = 0
    body.product = []
    body.OfferProdct = []
    body.minOrder = 0
    body.whorate = [],
        body.logo = ""
    body.stars = {
        index: 0,
        total: 0
    }
    body.orders = 0
    body.openAndCloseTime = []
    body.open = false
    try {
        const stors = await Store.find()
        if (stors.find(e => e.email == body.email)) return res.send({ "success": false, 'message': 'this email is allraedy exst' })
        const result = await Store.create(body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

StoreRoute.put('/', async (req, res) => {
    const { id } = req.id
    const body = req.body
    try {
        const result = await Store.findByIdAndUpdate(id, body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

StoreRoute.get('/open/true', async (req, res) => {
    try {
        let rest = await Store.find()
        if (rest) {
            rest = rest.filter(e => e.open)
            res.send({ 'success': true, "lenght": rest.length, "result": rest })
            return
        }
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

StoreRoute.get('/close/:id', async (req, res) => {
    const { id } = req.params
    try {
        let rest = await Store.findById(id)
        rest.open = false
        let result = await Store.findByIdAndUpdate(id, rest)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

StoreRoute.get('/open/:id', async (req, res) => {
    const { id } = req.params
    try {
        let rest = await Store.findById(id)
        rest.open = true
        let result = await Store.findByIdAndUpdate(id, rest)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    }
    catch (error) {
        res.send(error)
    }
})


module.exports = StoreRoute