const experss = require('express')
const Auth = experss.Router()
const User = require('../models/user')
const Livror = require('../models/livror')
const Store = require('../models/Store')
const Resturant = require('../models/resturants')

Auth.post('/', async (req, res) => {
    const type = req.body.type
    const email = req.body.email
    const password = req.body.password
    try {
        let result;
        if (type == 'user') {
            result = await User.find()
            result = result.find(e => e.email == email)
            if (!result) return res.send({ 'success': false, 'message': 'email not found' })
            if (result.password == password) return res.send({ 'success': true, 'result': result })
            res.send({ 'success': false, 'message': 'password not curect' })
            return
        } else if (type == 'rest') {
            result = await Resturant.find()
            result = result.find(e => e.email == email)
            if (!result) return res.send({ 'success': false, 'message': 'email not found' })
            if (result.password == password) return res.send({ 'success': true, 'result': result })
            res.send({ 'success': false, 'message': 'password not curect' })
            return
        } else if (type == 'livror') {
            result = await Livror.find()
            result = result.find(e => e.email == email)
            if (!result) return res.send({ 'success': false, 'message': 'email not found' })
            if (result.password == password) return res.send({ 'success': true, 'result': result })
            res.send({ 'success': false, 'message': 'password not curect' })
            return
        } else if (type == 'store') {
            result = await Store.find()
            result = result.find(e => e.email == email)
            if (!result) return res.send({ 'success': false, 'message': 'email not found' })
            if (result.password == password) return res.send({ 'success': true, 'result': result })
            res.send({ 'success': false, 'message': 'password not curect' })
            return
        }
        res.send({ 'success': false, 'message': 'password not curect' })
    } catch (error) {
        res.send(error)
    }
})

module.exports = Auth