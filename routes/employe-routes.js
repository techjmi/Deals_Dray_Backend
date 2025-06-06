const express= require('express')
const { CreateEmp, GetAllEmployees, EditEmployee, FetchById, delete_emp } = require('../controller/employe-controller')
const verifyToken = require('../utils/auth')
const router= express.Router()
router.post('/create',  CreateEmp)
router.get('/emp_list',GetAllEmployees)
router.get('/employee/:id', FetchById)
router.put('/emp_edit/:id', EditEmployee)
router.delete('/emp_delete/:id', delete_emp)
// router.post('/login', SignUp)
module.exports= router