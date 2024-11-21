const Employee = require("../model/employe-model");

// Logic for Employee Signup
const CreateEmp = async (req, res) => {
  const { fullName, email, MobileNo, Designation, Gender, course, image } = req.body;

  // Validate required fields
  if (!fullName || !email || !MobileNo || !Designation || !Gender || !course) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email address" });
  }

  // Validate mobile number format (10 digits)
  if (!/^\d{10}$/.test(MobileNo)) {
    return res.status(400).json({ message: "Please provide a valid 10-digit mobile number" });
  }

  // Validate gender
  const validGenders = ['Male', 'Female', 'Other'];
  if (!validGenders.includes(Gender)) {
    return res.status(400).json({ message: "Gender must be Male, Female, or Other" });
  }

  // Validate course (check if the array is empty, as this is required)
  if (course.length === 0) {
    return res.status(400).json({ message: "At least one course must be selected" });
  }

  try {
    // Check if email already exists in the database
    const isExist = await Employee.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new employee record
    const newEmployee = new Employee({
      fullName,
      email,
      MobileNo,
      Designation,
      Gender,
      course, 
      image,
    });

    // Save the new employee to the database
    await newEmployee.save();
    res.status(201).json({ message: "Employee Created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { CreateEmp };
