const path = require("path");

const express = require("express");

const transporter = require("../configs/mail");

const Product = require("../models/product.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 10; 

    const skip = (page - 1) * pagesize; 

    const products = await Product.find()
      .skip(skip) 
      .limit(pagesize) 
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await Product.find().countDocuments()) / pagesize
    );

    return res.status(200).send({ products, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    transporter.sendMail({
      from: '"Amazon admin" <admin@amazon.com>', 
      to: product.sellerEmail, 
      subject: "Your Product is successfully created", 
      text: "Hello sir/madam your product is successfully created", 
      alternatives: [
        {
          contentType: "text/html",
          path: path.join(__dirname, "../mailers/product-created.mail.html"),
        },
        {
          filename: "product.txt",
          path: path.join(__dirname, "../mailers/product-details.txt"),
        },
      ],
    });

    return res.status(201).send({ message: "Product created successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
