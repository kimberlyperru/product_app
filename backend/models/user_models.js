//Import mongoose (helps talk to mongodb)
const mongoose = require('mongoose');

//Create a schema (this is like a blueprint for what a user should look like)
const userSchema = new mongoose.Schema({
    name: String, //user's name
    email: String, //user's email
    password: String, //user's password(plain text for now, will hash later )
});

//create a model called "user" using the userSchema
const User = mongoose.model('user', userSchema);

//export the model so we can use it in other files
module.exports = User;


