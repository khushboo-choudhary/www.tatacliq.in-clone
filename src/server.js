require("dotenv").config();
const express = require("express");
const fast2sms = require('fast-two-sms');
const app = express();
const start = require("./configs/db");
// const upload = require("./configs/multer");
const { register, Otp } = require("./controllers/auth.controller");
// const { body } = require("express-validator");
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.post("/reg", register);
app.post("/Otp", Otp);

port = process.env.PORT || 80;


var generatedOTP;
function generateOTP() {

  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }

  generatedOTP = OTP;
  setTimeout(() => {
     
      OTP;
  }, 3000)


}


app.post('/sendMessage', async (req,res) => {
  generateOTP();
  console.log(generatedOTP);
  var smsBody = "Dear Customer, Your OTP is " + generatedOTP + ". Please do not share it with anyone.";
  const response = await fast2sms.sendMessage({authorization: "PtndEskwgjMoA8m3BJyxDeHhL6KFICWTazcGruip0UX9qf5NVSUznvSLRkgjZyeY4IcuP0d7XOwblmKi",
                                               message: smsBody, numbers: [req.body.number] })
  res.send(response);
  }
)


module.exports = async () => {
    try {
      start();
      app.listen(port, () => {
        console.log(`listening on port ${port}`);
      });
    } catch (error) {
      console.log(error.message);
    }
  };