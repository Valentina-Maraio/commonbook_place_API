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


//Set the PORT for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT,  () => {
    console.log(`Server running on port ${PORT}`);
});

