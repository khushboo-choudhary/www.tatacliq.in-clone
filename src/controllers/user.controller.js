const { body, validationResult } = require("express-validator");

const express = require("express");

const User = require("../models/user.model");
const req = require("express/lib/request");

const router = express.Router();

router.post(
  "",
  body("id")
    .isNumeric()
    .withMessage("Id is not a number")
    .bail()
    .custom(async (value) => {
      const user = await User.findOne({ id: value });
      if (user) {
        throw new Error("Id already exists");
      }
      return true;
    }),
  body("first_name")
    .isString()
    .isLowercase()
    .isLength({ min: 3, max: 20 })
    .withMessage("First name should be 3 to 20 characters long"),
  body("last_name").isLowercase().isLength({ min: 3, max: 20 }),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),
 
 
  
  // body("user_id").custom(async (value, {req}) => {
  //   const post = await Post.findById(req.params.id);
  //     if (! post) {
  //       throw new Error("Post does not exists");
  //     }
  //   if (post.user_id !== req.query.user_id) {
  //     throw new Error("User is not the same");
  //     }
  //     return true;
  // })
  async (req, res) => {
    try {
      const errors = validationResult(req);
      // errors = []
      if (!errors.isEmpty()) {
        let newErrors;
        newErrors = errors.array().map((err) => {
          console.log("err", err);
          return { key: err.param, message: err.msg };
        });
        return res.status(400).send({ errors: newErrors });
      }
      const user = await User.create(req.body);

      // when user registers
      // verification email is sent to user
      // eventEmitter.on("User Registered", verificationMail);
      // welcome email is sent to user

      return res.send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);


module.exports = router;
