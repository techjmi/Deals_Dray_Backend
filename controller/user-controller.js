const Deal_User = require("../model/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SignUp Logic
const SignUp = async (req, res) => {
  const { fullName, email, password, profile_pic, userName } = req.body;
  console.log(email); // Debugging log
  try {
    if (!fullName || !email || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const isExist = await Deal_User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const newUser = new Deal_User({
      fullName,
      email,  // Store email
      userName,
      password: hashedPassword,
      profile_pic,
    });

    // Save the new user
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// SignIn Logic
const SignIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    // Validate user input
    if (!userName || !password) {
      return res.status(400).json({ message: "Please fill username and password!" });
    }

    // Find user by username (change to email if needed)
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
      { _id: user._id, email: user.email, fullName: user.fullName, profile_pic: user.profile_pic },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Optional expiration for the token
    );

    // Prepare user data to send back (excluding password)
    const { password: _, ...rest } = user._doc;

    // Set JWT in cookie
    res.cookie("deal_token", token, { httpOnly: true, secure: true }).json({
      message: "Signin successful",
      user: rest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { SignIn, SignUp };
