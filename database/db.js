const mongoose= require('mongoose')
const url=process.env.MONGO_URI
const ConnectToDB= async()=>{
    try {
        await mongoose.connect(url)
        console.log('connection is sucessfull with database')
    } catch (error) {
        console.log(`Error While connecting with db`, error.message)
    }
}
module.exports=ConnectToDB