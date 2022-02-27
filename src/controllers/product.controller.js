const express = require("express");

const Product = require("../models/product.model");

const upload= require('../middlewares/file_uploads');

// const authenticate = require("../middlewares/authenticate");

const router = express.Router();

// router.post("", async (req, res) => {   //, authenticate
//   try {
//     req.body.user_id = req.user._id;
//     const product = await Product.create(req.body);

//     return res.send(product);
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });
router.post("", 
upload.any('image'),
async(req,res)=>{
    try{
        const filePath= req.files.map((file) => file.path)
        const product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            cutoff_price: req.body.cutoff_price,
            rating: req.body.rating,
            product_left: req.body.product_left,
            image: filePath
        });

        return res.send(product);
    }catch(err){
        return res.status(500).send({message: err.message})
    }
});

router.get("", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    return res.send(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const products = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();

    return res.send(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
	try{
	const user= await Product.findByIdAndDelete(req.params.id).lean().exec();
	return res.send(user);
	}
	catch (e) {
		return res.status(500).send(e.message);
	}
})

module.exports = router;
