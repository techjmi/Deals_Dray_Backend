const express= require('express')
const { SignUp } = require('../controller/user-controller')
const router= express.Router()
router.post('/signup', SignUp)
router.post('/login', SignUp)
module.exports= router