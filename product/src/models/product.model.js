const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image:{ type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    cutoff_price: { type: Number, required: true },
    rating: { type: Number, required: true },
    product_left: { type: Number, required: true },
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
