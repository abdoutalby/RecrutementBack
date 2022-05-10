const express = require('express')
const router = express.Router()

const {CondidatProtect} = require('../middleware/condidatMiddleware')

const {
    getAll,
    updatePostulation,
    deletePostulation,
    createPostulation,
    getById
     
   }
= require('../controllers/postulerController')   

router.get('/', getAll)
router.post('/',CondidatProtect, createPostulation)
router.delete('/:id', deletePostulation)
router.put('/:id' , updatePostulation)
router.get('/:id' , getById)

module.exports = router