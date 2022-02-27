const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "4304f8775ad7a0", // generated ethereal user
    pass: "4640a1d813596d", // generated ethereal password
  },
});




