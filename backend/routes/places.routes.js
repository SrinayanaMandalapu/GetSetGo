const express=require('express');

const router=express.Router();
const getPlaces=require("../controllers/places.controllers.js");

router.get('/api/getPlaces', getPlaces)

module.exports=router;