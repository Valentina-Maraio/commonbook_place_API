const connectToDatabase = require("./db");
const Book = require("./models/Book");

exports.handler = async (event) => {
    await connectToDatabase();
    const { id } = event.queryStringParameters;
    const updates = JSON.parse(event.body);

    try {
        const book = await Book.findById(id);
        if (!book) return { statusCode: 404, body: "Book not found" };

        Object.assign(book, updates);
        await book.save();
        return { statusCode: 200, body: JSON.stringify(book) };
    } catch (err) {
        return { statusCode: 500, body: "Server error" };
    }
};
