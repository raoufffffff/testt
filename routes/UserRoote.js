const express = require('express')
const UserRoote = express.Router()
const User = require('../models/user')

UserRoote.get("/", async (req, res) => {
    try {
        const result = await User.find()
        if (result) return res.send({ "success": true, 'lenght': result.length, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

UserRoote.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await User.findById(id)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

UserRoote.post("/", async (req, res) => {
    const body = req.body
    body.orders = 0
    body.cancelOrders = 0
    body.Favorite = []
    body.reating = []
    try {
        const users = await User.find()
        if (users.find(e => e.email == body.email)) return res.send({ "success": false, 'message': 'this email is allraedy exst' })
        const result = await User.create(body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

UserRoote.put("/:id", async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const result = await User.findByIdAndUpdate(id, body)
        if (result) return res.send({ "success": true, "result": result })
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

UserRoote.put('/Favorite/:id', async (req, res) => {
    const { id } = req.params
    const resturantid = req.body.resturantid
    try {
        const result = await User.findById(id)
        if (result) {
            if (result.Favorite.find(e => e == resturantid)) {
                res.send({ 'success': false, 'message': 'you are allready make it favorite' })
                return
            }
            result.Favorite = [...result.Favorite, resturantid]
            const updateresult = await User.findByIdAndUpdate(id, result)
            if (updateresult) return res.send({ "success": true, "result": updateresult })
            res.send({ 'success': false, 'message': 'sothing went wrong with this' })
            return
        }
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})


UserRoote.delete('/Favorite/:id', async (req, res) => {
    const { id } = req.params
    const resturantid = req.body.resturantid
    try {
        const result = await User.findById(id)
        if (result) {
            result.Favorite = result.Favorite.filter(e => {
                return e == resturantid ? null : e
            })
            const updateresult = await User.findByIdAndUpdate(id, result)
            if (updateresult) return res.send({ "success": true, "result": updateresult })
            res.send({ 'success': false, 'message': 'sothing went wrong whith this' })
            return
        }
        res.send({ 'success': false, 'message': 'sothing went wrong' })
    } catch (error) {
        res.send(error)
    }
})

module.exports = UserRoote
