//import important packages
const express = require("express"); //framework to build web applications
const mongoose = require("mongoose"); //helper to interact with MongoDB
const cors = require("cors"); //middleware to enable CORS (Cross-Origin Resource Sharing) allows frontend to communicate with backend
require('dotenv').config(); // Load environment variables from .env file

//create express app
const app = express();

//middleware (functions that run during the request to the server)
app.use(cors()); //enable CORS for all routes (allow requests from any origin)
app.use(express.json()); //parse JSON request bodies (automatically convert JSON to JavaScript object) without this req.body will be undefined

//connect to MongoDB database
//process.env.MONGO_URI gets the MongoDB connection string from the .env file
//example inside .env
//MONGO_URI=mongodb://localhost:27017/product_app
//port=5000
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB")) //if connection is successful, log message
.catch((error) => console.error("Could not connect to MongoDB...", error)); //if there is an error, log the error message

//Routes- where the app listens for specifuc URLS
//Import product routes files
//(this is the router we made earlier in routes/product_routes.js)
const productRoutes = require('./routes/product_routes');

//if soemeone visits /api/products, use the productRoutes router
// eg GET http://localhost:5000/product_app/products get all products
//    POST http://localhost:5000/product_app/products create a new product
app.use('/product_app/products', productRoutes);

//start the server  
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}); 
//listen on port 5000 (or the port specified in the .env file)

