const mongoose = require("mongoose");

module.exports = () => {
    // return mongoose.connect("mongodb+srv://khushboo:khushboo123@cluster0.edtcl.mongodb.net/tatacliq");
    return mongoose.connect("mongodb://localhost:27017/tatacliq");
  };
  