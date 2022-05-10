const express = require('express')
const router = express.Router()
const {AdminProtect} = require('../middleware/adminMiddleware')
const {
  registerAdmin,
  loginAdmin,
  getAdmin,
} = require('../controllers/adminController')
 
router.post('/', registerAdmin)
router.post('/login', loginAdmin)
router.get('/me', AdminProtect,getAdmin)

module.exports = router
  