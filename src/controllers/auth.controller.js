require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const transporter = require("../configs/mailuser")

function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}


const register = async (req, res) => {
  // return res.status(400).send(req.body);
  try {
    // we will try to find the user with the email provided
    let user = await User.findOne({ email: req.body.email }).lean().exec();
  
    
    // if the user is found then it is an error
    if (user)
      return res.status(400).send({ message: "Please try another email" });
    
    // if user is not found then we will create the user with the email
    req.body.otp = generateOTP();
    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Otp verification", // Subject line
      text: `Your verifivation code is ${req.body.otp}`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
    user = await User.create(req.body);
  
   

    // then we will create the token for that use
    // then return the user and the token

    res.send({ mes: `Otp has been sent to your email address` });

   
   
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const Otp = async (req, res) => {
  try {
    // we will try to find the user with the email provided
    const user = await User.findOne({ email: req.body.email });
   

    // If user is not found then return error
    if (!user)
      return res.status(400).send({ message: "Please try another email" });
   
    // if user is found then we will match the passwords
    const match = user.checkOTP(req.body.otp);
    if (!match) return res.status(400).send({ message: "otp is incorrect" });
    if (user.status == false) {
      user.status = true;
      await user.save();
    }
   
    // then we will create the token for that user
   

    // then return the user and the token
    res.send({ user });
   
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { register, Otp };
