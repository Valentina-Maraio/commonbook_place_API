const mongoose = require('mongoose');
require('dotenv').config();

let connection = null;
const mongo_uri = process.env.MONGO_URI

const connectToDatabase = async () => {
    if(connection) return connection;
    try{
        connection = await mongoose.connect(mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
        return connection;
    } catch(err){
        console.log("MongoDB connection error: ", err);
    }
};

module.exports = connectToDatabase;