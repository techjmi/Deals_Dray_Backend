const mongoose = require('mongoose');

const EmpSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    minlength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
  },
  MobileNo: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^\d{10}$/, "Please provide a valid 10-digit mobile number"],
  },
  Designation: {
    type: String,
    required: [true, "Designation is required"],
  },
  Gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ['Male', 'Female', 'Other'], 
  },
  course: {
    type: [String],
    required: [true, "At least one course must be selected"],
  },
  image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/21/21104.png", 
  },
}, { timestamps: true });

const Employee = mongoose.model('Employee', EmpSchema);
module.exports = Employee;
