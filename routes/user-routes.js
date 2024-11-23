const express= require('express')
const { SignUp, SignIn, handleLogout } = require('../controller/user-controller')
const router= express.Router()
router.post('/signup', SignUp)
router.post('/login', SignIn)
router.post('/logout', handleLogout)
module.exports= router