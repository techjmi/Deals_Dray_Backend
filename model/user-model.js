const mongoose = require('mongoose');

const user_schema = mongoose.Schema({
    fullName: {
        type: String,
        minlength: 3,
        trim: true,
        required: [true, "Full name is required"], 
    },
    userName: {
        type: String, 
        minlength: 3,
        trim: true,
        required: [true, "Username is required"],
        unique: true, 
    },
    email: {
        type: String, 
        trim: true,
        required: [true, "Email is required"], 
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
            "Please provide a valid email address"
        ],
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, "Password is required"], 
    },
    profile_pic: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/21/21104.png"
    },
}, { timestamps: true });

const Deal_User = mongoose.model('Deal_User', user_schema);
module.exports= Deal_User
