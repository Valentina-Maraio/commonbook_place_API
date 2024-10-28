const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const Book = require('./models/Book')
const mongoose = require('mongoose');
require('dotenv').config(); 

const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error: ", err));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

//GET all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch(err) {
        res.status(500).send('Server error');
    }
});

//GET Single Book by Id
app.get('/api/books/:id', async (req, res) => {
    try{
        const book = await Book.fingById(req.params.id);
        if(!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch(err) {
        res.status(500).send('Server error');
    }
});

//POST Create new book
app.post('/api/books', async (req, res) => {
    const {
        title,
        authorOne,
        authorTwo,
        description,
        ownedCopies,
        language,
        imageUrl,
        createdAt,
        publishedIn,
    } = req.body;

    try {
        const newBook = new Book({
            title,
            authorOne,
            authorTwo,
            description,
            ownedCopies,
            language,
            imageUrl,
            createdAt,
            publishedIn,
        });
        await newBook.save();
        res.status(201).json(newBook);
    } catch(err) {
        res.status(500).send('Server error');
    }
});


//PUT Update book by Id
app.put('/api/books/:id', async(req, res) => {
    const {
        title,
        authorOne,
        authorTwo,
        description,
        ownedCopies,
        language,
        imageUrl,
        publishedIn,
    } = req.body;

    try {
        let book = await Book.findById(req.params.id);
        if(!book) return res.status(404).send('Book not found');

        book.title = title;
        book.authorOne = authorOne;
        book.authorTwo = authorTwo;
        book.description = description;
        book.ownedCopies = ownedCopies;
        book.language = language;
        book.imageUrl = imageUrl;
        book.publishedIn = publishedIn;
        await book.save();

        res.json(book);
    } catch(err) {
        res.status(500).send('Server error')
    }
});

//DELETE a book by Id
app.delete('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) return res.status(404).send('Book not found');

        await book.remove();
        res.json({
            msg: 'Book deleted :( '
        });
    } catch (err) {
        res.status(500).send('Server error')
    }
});

//Set the PORT for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT,  () => {
    console.log(`Server running on port ${PORT}`);
});

