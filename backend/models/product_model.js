//Import mongoosse
const mongoose = require('mongoose');

//Define the product schema 
const productSchema = new mongoose.Schema({
    name: String,  // Name of the product
    price: Number, // Price of the product

});

//Create a product model using the schema
const Product = mongoose.model('Product', productSchema);

//Export the product model for use in other parts of the application
module.exports = Product;
