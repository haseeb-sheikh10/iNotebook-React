const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

// calling db.js to connect to MongoDB
connectToMongo();

const app = express()
const port = 5000

// midleware to use API Endpoints
app.use(express.json());
app.use(cors());

//Available Routes
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook listening at http://localhost:${port}`)
})