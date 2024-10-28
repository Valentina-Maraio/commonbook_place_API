const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Book = require('../models/Book')

//POST route to add a new book (protected route)
router.post('/', auth, async(req, res) => {
    const {
        title,
        authorOne,
        authorTwo,
        description,
        ownedCopies,
        language,
        imageUrl,
        cretedAt,
    } = req.body;

    try {
        const newBook = new  Book({
            title,
            authorOne,
            authorTwo,
            description,
            ownedCopies,
            language,
            imageUrl,
            cretedAt,
            user: req.user
        });

        const book = await newBook.save();
        res.status(201). json(book);
    } catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router