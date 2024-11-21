const Deal_User = require("../model/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//logic for signup
const SignUp = async (req, res) => {
  const { fullName, email, password, profile_pic, userName } = req.body;
  try {
    if (!fullName || !email || !password || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const isExist = await Deal_User.findOne({ email });
    if (isExist) {
      res.status(404).json({ message: "Email already Exist" });
    }
    const hashedPassord = bcryptjs.hashSync(password, 10);
    const newUser = new Deal_User({
      fullName,
      userName,
      password: hashedPassord,
      profile_pic,
    });
    await newUser.save();
    res.status(201).json({ message: "signup sucessfull" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
//signin logic
const SignIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if ((!userName, password)) {
      res.status(404).json({ message: "Please fill username and password!" });
    }
    const user = Deal_User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Wrong username or password" });
    }
    const isMatch = await bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      res.status(404).json({ message: "Please fill username and password!" });
    }
    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profile_pic: user.profile_pic,
    },process.env.JWT_SECRET);
    
    const {password:password, ...rest}= user._doc
    res.cookie("deal_token", token, {
      httpOnly: true,
    }).json({message:"Signin Successfull",user:rest});
  } catch (error) {}
};
module.exports={SignIn, SignUp}