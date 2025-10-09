//import express from 'express';
const express = require('express');

//import the user model
const User = require('../models/user_models'); 

//create a router (mini express app)
const router = express.Router();

//SINUP route
//when a new user wants to register
router.post('/signup', async (req, res) => {
    try {
    const { name, email, password } = req.body; //get user details from request body

    //check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
    }

    //create a new user instance
    const newUser = new User({ name, email, password });

    //save it in mongodb
    await newUser.save();

    //send success response
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }   
});

//LOGIN route
//when an existing user wants to login
router.post('/login', async (req, res) => {
    try {
    const { email, password } = req.body; //get login details from request body

    //find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }
    //check if password matches
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    //send success response
    res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
//export the router so we can use it in other files
module.exports = router;