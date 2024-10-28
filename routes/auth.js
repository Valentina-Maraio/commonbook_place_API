const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config(); 

const jwtPass = process.env.JWT_SECRET

//POST route for user registration
router.post('/register', async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    try {
        //Check if user already exists
        let user = await User.findOne( { email } );
        if(user){
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        //Create a new user
        user = new User({ name, email, password});
        await user.save();

        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// POST route for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        //Find user by email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }

        //Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }

        //Create a JWT token
        const payload = { userId: user._id};
        const token = jwt.sign(payload, jwtPass, {
            expiresIn: '24h'
        });

        res.json({token});
    } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;