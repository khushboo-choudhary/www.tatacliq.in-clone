const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://khushboo:khushboo123@cluster0.edtcl.mongodb.net/tatacliq");
    
  };
  