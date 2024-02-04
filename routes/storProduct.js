const express = require('express')
const StorProduct = require('../models/storProduct')
const StorProductRoute = express.Router()


StorProductRoute.get('/', async (req, res) => {
    try {
        const result = await StorProduct.find()
        if (result) return res.send({ "success": true, "lenght": result.length, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

StorProductRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await StorProduct.findById(id)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

StorProductRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const result = await StorProduct.findByIdAndUpdate(id, body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

StorProductRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await StorProduct.findByIdAndDelete(id)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})


StorProductRoute.post('/', async (req, res) => {
    const body = req.body
    console.log(body);
    try {
        const result = await StorProduct.create(body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

module.exports = StorProductRoute