const mongoose = require('mongoose'); 
const mongoURI = 'mongodb+srv://haseeb-sheikh10:Nawazganja123@testcluster.j9uxqdb.mongodb.net/iNotebook'

// Connecting to MongoDB Atlas through Mongo URI
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {  
        console.log('Connected to Mongoose Successfully');
    })
}

module.exports = connectToMongo;