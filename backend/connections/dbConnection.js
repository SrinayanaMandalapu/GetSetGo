require('dotenv').config();
const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    // Optimize connection options
    
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`Database connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = dbConnect;