const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product')

//POST route to add a new product (protected route)
router.post('/', auth, async (req, res) => {
    const { name, description, price, imageUrl} = req.body;

    try {
        const newProcduct = new Product({
            name,
            description,
            price,
            imageUrl,
            user: req.user
        });

        const product = await newProcduct.save();
        res.status(201).json(product);
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;