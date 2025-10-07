// import express
const express = require('express');

// create a router object
// Router is a mini express application
const router = express.Router();

// import the product model (the blueprint for the product in MongoDB)
const Product = require('../models/product_model');

// create a new product
// when someone sends a POST request to "/" like http://localhost:5000/product_app/products/
// this code will run
router.post('/', async (req, res) => {
    try {
        // request body contains the data sent by the client to create a new product like name, price etc.
        const product = new Product(req.body); // create a new product instance using the data from the request body

        // save the product to MongoDB
        const savedProduct = await product.save();

        // send the saved product as a response to the client
        res.status(201).json(savedProduct); // 201 means created successfully
    } catch (error) {
        // if there is an error, send a 500 status code and the error message
        res.status(500).json({ message: error.message });
    }
});

// get all products
router.get('/', async (req, res) => {
    try {
        // fetch all products from MongoDB
        const products = await Product.find(); // Product.find() returns a promise that resolves to an array of products

        // send the products as a JSON response to the client
        res.json(products);
    } catch (error) {
        // if there is an error, send a 500 status code and the error message
        res.status(500).json({ message: error.message });
    }
});

// export the router so server.js can use it
module.exports = router;
