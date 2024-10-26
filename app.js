const express = require('express');
const app = express();

app.use(express.json());

//Basic Routes
app.get('/', (req, res) => {
    res.send('Welcome to the REST API')
});

//Set the PORT for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT,  () => {
    console.log(`Server running on port ${PORT}`);
});

