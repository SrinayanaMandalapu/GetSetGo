const express=require('express');
const router=express.Router();
const register=require("../controllers/auth_controllers.js").registerUser;
const login=require("../controllers/auth_controllers.js").loginUser;

router.post('/register', register)
router.post('/login', login)

module.exports=router;