// require('dotenv').config();
// const mongoose = require("mongoose");

// const dbConnect = async () => {
//   try {
//     // Optimize connection options
    
//     const connect = await mongoose.connect(process.env.MONGODB_URI);
//     //const connect = await mongoose.connect("mongodb+srv://taniaban2712:<Tania%404556677>@cluster0.5zi6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    
//     console.log(`Database connected: ${connect.connection.host}`);
//   } catch (error) {
//     console.error("Database connection error:", error);
//     process.exit(1);
//   }
// };

// module.exports = dbConnect;

// dbConnection.js
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
  try {
    // Make sure it's using the correct environment variable
    const uri = process.env.MONGODB_URI;
    
    // Add debugging to see what's happening
    console.log('MongoDB URI:', uri ? 'URI is defined' : 'URI is undefined');
    
    if (!uri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }
    
    await mongoose.connect(uri);
    console.log('Connected to MongoDB database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

module.exports = dbConnect;