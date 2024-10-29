const connectToDatabase = require("./db");
const Book = require("./models/Book");

exports.handler = async (event) => {
    await connectToDatabase();
    const { id } = event.queryStringParameters;

    try {
        const book = await Book.findById(id);
        if (!book) return { statusCode: 404, body: "Book not found" };

        await book.remove();
        return { statusCode: 200, body: JSON.stringify({ msg: "Book deleted" }) };
    } catch (err) {
        return { statusCode: 500, body: "Server error" };
    }
};
