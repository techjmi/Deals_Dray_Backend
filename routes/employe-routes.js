const express= require('express')
const { CreateEmp } = require('../controller/employe-controller')
const router= express.Router()
router.post('/create', CreateEmp)
// router.post('/login', SignUp)
module.exports= router