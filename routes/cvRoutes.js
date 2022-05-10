const express = require('express')
const route= express.Router()

const {
    get,
    getAll,
    create,
    deleteCV,
    updateCV
} = require('../controllers/cvController')


route.get('/',get)
route.get('/all', getAll)
route.post('/', create)
route.delete('/:id', deleteCV)
route.put('/:id', updateCV)

module.exports = route