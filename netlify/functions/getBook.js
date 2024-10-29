const connectToDatabase = require('./db');
const Book = require('./models/Book')

exports.handler = async () => {
    await connectToDatabase();
    try {
        const books = await Book.find();
        return {
            statusCode: 200,
            body: JSON.stringify(books),
        };
    } catch (err) {
        return { statusCode: 500, body: "Server error" };
    }
}