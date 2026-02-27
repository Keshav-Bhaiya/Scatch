const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model")

router.get("/create", function(req, res) {
  res.render("createproducts"); // Render the product creation form
});

router.post("/create", upload.single("image"), async function(req, res) {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    console.log("Received product data:", req.body);
    if (!req.file) {
      console.log("No image file uploaded");
      return res.status(400).send("Image is required");
    } else {
      console.log("Image file uploaded:", req.file.originalname);
    }
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    console.log("Product created:", product);
    req.flash("success", "Product created successfully");
    res.redirect("/owners/admin");
  } catch (err) {
    console.log("Error creating product:", err);
    res.send(err.message);
  }
});

module.exports = router;