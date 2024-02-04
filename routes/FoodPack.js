const express = require('express')
const FoodPackRoute = express.Router()
const FoodPack = require('../models/FoodPack')
const Resturant = require('../models/resturants')

FoodPackRoute.get('/', async (req, res) => {
    try {
        const result = await FoodPack.find()
        if (result) return res.send({ "success": true, "lenght": result.length, "result": result })
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

FoodPackRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await FoodPack.findById(id)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ "success": false, "message": "id not found" })
    } catch (error) {
        res.send(reeor)
    }
})

FoodPackRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await FoodPack.findByIdAndDelete(id)
        if (result) return res.send({ "success": true })
        res.send({ "success": false, "message": "id not found" })
    } catch (error) {
        res.send(error)
    }
})

FoodPackRoute.post('/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const resturant = await Resturant.findById(id)
        if (resturant) {
            body.ownerid = id
            const result = await FoodPack.create(body)
            console.log(result);
            if (result) return res.send({ "success": true, "result": result })
            res.send({ "success": false, 'message': 'somting went wrong' })
            return
        }
        res.send({ "success": false, "message": "the resturat not exist our you need to log in your resturant account" })
    } catch (error) {
        res.send(error)
    }
})


FoodPackRoute.put('/update/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const result = await FoodPack.findByIdAndUpdate(id, body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})


FoodPackRoute.get('/menu/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await FoodPack.find()
        if (result) {
            console.log(result);
            const menu = result.filter(e => e.ownerid === id)
            res.send({ "success": true, "length": menu.length, "result": menu })
            return
        }
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

module.exports = FoodPackRoute