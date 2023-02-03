const mongoose = require('mongoose'); 
const mongoURI = process.env.MONGO_URI;

// Connecting to MongoDB Atlas through Mongo URI
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {  
        console.log('Connected to Mongoose Successfully');
    })
}

module.exports = connectToMongo;