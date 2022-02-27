const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    otp: { type: Number, required: true }, // _id => MongoID, id => regular id
    email: { type: String, required: true },
    number:{type: Number,required: true },
    status: { type: Boolean, required: true, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);



userSchema.methods.checkOTP = function (otp) {
  return otp == this.otp;
};

const User = model("user", userSchema); // user => users
module.exports = User;
