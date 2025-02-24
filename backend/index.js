require('dotenv').config();
const express=require('express');
const app=express();

const port=process.env.PORT;
const placesRouter=require("./routes/places.routes.js")

app.use('/', placesRouter);

app.listen(port,()=>{
    console.log(`The app is running at ${port}`);
})