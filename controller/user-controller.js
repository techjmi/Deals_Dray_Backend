const Deal_User = require("../model/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Logic for user signup
const SignUp = async (req, res) => {
  const { fullName, email, password, profile_pic, userName } = req.body;

  try {
    // Check for empty fields
    if (!fullName || !email || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if email already exists
    const emailExist = await Deal_User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if username already exists
    const userNameExist = await Deal_User.findOne({ userName });
    if (userNameExist) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const newUser = new Deal_User({
      fullName,
      email,
      userName,
      password: hashedPassword,
      profile_pic,
    });

    // Save the new user
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logic for user sign-in
const SignIn = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Validate user input
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Please fill username and password!" });
    }

    // Find user by username
    const user = await Deal_User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "Wrong username or password" });
    }

    // Compare the provided password with stored hash
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profile_pic: user.profile_pic,
      },
      process.env.JWT_SECRET
    );
// console.log('the login token', token)
    // Prepare user data to send back (excluding password)
    const { password: _, ...rest } = user._doc;

    // Set JWT in cookie
    res
      .cookie("deal_token", token, {
        httpOnly: true,
        secure: true,
        // sameSite: "none",
        path: "/",
        secure: process.env.NODE_ENV === 'production',
        domain: 'deals-dray-backend.onrender.com'
      })
      .json({
        message: "Signin successful",
        user: rest,
      });
  } catch (error) {
    console.error('Error in signin:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logic for user logout
const handleLogout = (req, res) => {
  // res.clearCookie('deal_token'); 
  console.log('logout called')
  res.clearCookie("deal_token",{
    path: "/",
  })
  
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { SignIn, SignUp, handleLogout };
