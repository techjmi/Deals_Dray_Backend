const express= require('express')
require('dotenv').config()
const app= express()
const cors= require('cors')
const cookieParser= require('cookie-parser')
const ConnectToDB = require('./database/db')
const userRoutes=require('./routes/user-routes')
const EmpRoutes= require('./routes/employe-routes')
const PORT=process.env.PORT||8000



//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/api/auth',userRoutes)
app.use('/api/empolyee',EmpRoutes)
ConnectToDB()
app.use(cors({}))
app.listen(PORT,()=>{
    console.log(`The server is running on PORT ${PORT}`)
})