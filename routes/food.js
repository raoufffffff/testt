const express = require('express')
const foodroute = express.Router()
const Food = require('../models/food')
const Resturant = require('../models/resturants')

foodroute.get('/', async (req, res) => {
    try {
        const result = await Food.find()
        if (result) return res.send({ "seccess": true, "lenght": result.length, "result": result })
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

foodroute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Food.findById(id)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

foodroute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Food.findByIdAndDelete(id)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

foodroute.get('/menu/:id', async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const result = await Food.find()
        if (result) {

            const menu = result.filter(e => e.ownerid === id)
            res.send({ "success": true, "length": menu.length, "result": menu })
            return
        }
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})

foodroute.get('/delet/all', async (req, res) => {
    try {
        const rest = await Food.find()
        if (rest) {
            for (let i = 0; i < rest.length; i++) {
                let a = await Food.findByIdAndDelete(rest[i]._id)
                console.log('good');
            }
            res.send({ "success": true })
            return
        }
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})



foodroute.put('/update/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const result = await Food.findByIdAndUpdate(id, body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ "success": false, 'message': 'somting went wrong' })
    } catch (error) {
        res.send(error)
    }
})


foodroute.post('/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const resturant = await Resturant.findById(id)
        if (resturant) {
            const result = await Food.create(body)
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



module.exports = foodroute