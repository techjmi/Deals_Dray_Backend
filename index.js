const express= require('express')
require('dotenv').config()
const app= express()
const cookieParser= require('cookie-parser')
const cors= require('cors')
const ConnectToDB = require('./database/db')
const userRoutes=require('./routes/user-routes')
const EmpRoutes= require('./routes/employe-routes')
// const { insertEmployees } = require('./controller/employe-controller')
const PORT=process.env.PORT||8000

//middleware  
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    // origin: "https://deals-front.onrender.com",
    origin:"*",
    // origin:'http://localhost:5173',
    // credentials: true,
}));
ConnectToDB()
//routes
//shamim
app.use('/api/auth',userRoutes)
app.use('/api/employee',EmpRoutes)

// await insertEmployees()
app.listen(PORT,()=>{
    console.log(`The server is running on PORT ${PORT}`)
})
// insertEmployees()