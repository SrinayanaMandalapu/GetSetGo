require('dotenv').config();
const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    // Optimize connection options
    
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    //const connect = await mongoose.connect("mongodb+srv://taniaban2712:<Tania%404556677>@cluster0.5zi6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    
    console.log(`Database connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = dbConnect;

