const connectToDatabase = require("./db");
const Book = require("./models/Book");

exports.handler = async (event) => {
    await connectToDatabase();
    const bookData = JSON.parse(event.body);

    try {
        const newBook = new Book(bookData);
        await newBook.save();
        return { statusCode: 201, body: JSON.stringify(newBook) };
    } catch (err) {
        return { statusCode: 500, body: "Server error" };
    }
};
