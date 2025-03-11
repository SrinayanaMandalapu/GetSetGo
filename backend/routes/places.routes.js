const express=require('express');

const router=express.Router();
const getPlaces=require("../controllers/places_controllers.js");

router.get('/getPlaces', getPlaces)

module.exports=router;