const express = require('express')
const Ads = require('../models/ads')
const ads = express.Router()


ads.get('/', async (req, res) => {
    try {
        const resultads = await Ads.find()
        if (resultads) return res.send({ "seccess": true, 'lenght': resultads.length, 'result': resultads })
        res.send({ "seccess": true, "message": 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
})


ads.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const resultads = await Ads.findById(id)
        if (resultads) return res.send({ "seccess": true, 'result': resultads })
        res.send({ "seccess": true, "message": 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

ads.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const resultads = await Ads.findByIdAndDelete(id)
        if (resultads) return res.send({ "seccess": true, 'result': resultads })
        res.send({ "seccess": true, "message": 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
})



ads.post('/', async (req, res) => {
    const body = req.body
    try {
        const result = await Ads.create(body)
        if (result) return res.send({ "seccess": true, 'result': result })
        res.send({ "seccess": true, "message": 'somthing went wrong' })
    } catch (error) {

    }
})

ads.put('/:id', async (req, res) => {
    const body = req.body
    const { id } = req.params
    try {
        const result = await Ads.findByIdAndUpdate(id, body)
        if (result) return res.send({ "seccess": true, 'result': result })
        res.send({ "seccess": true, "message": 'somthing went wrong' })
    } catch (error) {
        res.send(error)
    }
})





module.exports = ads