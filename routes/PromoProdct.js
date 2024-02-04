const experss = require('express')
const PromoRoute = experss.Router()
const promo = require('../models/PromoProdct')


PromoRoute.get('/', async (req, res) => {
    try {
        const result = await promo.find()
        if (result) return res.send({ "seccess": true, 'lenght': result.length, 'result': result })
        res.send({ "seccess": false, 'message': 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

PromoRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await promo.findById(id)
        if (result) return res.send({ "seccess": true, 'result': result })
        res.send({ "seccess": false, 'message': 'somthing went wrong' })

    } catch (error) {
        res.send(error)
    }
})

PromoRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const result = await promo.findByIdAndUpdate(id, body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

PromoRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await promo.findByIdAndDelete(id)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

PromoRoute.post('/', async (req, res) => {
    const body = req.body
    try {
        const result = await promo.create(body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

module.exports = PromoRoute
