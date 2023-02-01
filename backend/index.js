const connectToMongo = require('./db');
const express = require('express');

// calling db.js to connect to MongoDB
connectToMongo();

const app = express()
const port = 5000

// midleware to use API Endpoints
app.use(express.json());

//Available Routes
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})