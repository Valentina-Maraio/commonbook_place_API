const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const mongoose = require('mongoose');
require('dotenv').config(); 

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error: ", err));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

//Set the PORT for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT,  () => {
    console.log(`Server running on port ${PORT}`);
});

