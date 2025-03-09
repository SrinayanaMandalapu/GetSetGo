// require('dotenv').config();
// const express=require('express');
// const app=express();

// const port=process.env.PORT;
// const placesRouter=require("./routes/places.routes.js")

// app.use('/', placesRouter);

// app.listen(port,()=>{
//     console.log(`The app is running at ${port}`);
// })

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// const tripRoutes = require('./routes/trips');
// const authRoutes = require('./routes/auth'); // Import auth routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log(err);
});

app.use('/api/trips', tripRoutes);
app.use('/api/auth', authRoutes); // Use auth routes

app.get('/', (req, res) => {
    res.send('Trip Itinerary Planner API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});