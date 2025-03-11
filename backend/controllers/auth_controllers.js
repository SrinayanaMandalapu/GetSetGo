// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { check, validationResult } = require("express-validator");
// const User = require("../models/User");

// const router = express.Router();
// const JWT_SECRET = "your_jwt_secret"; // Use env variable in production

// // Register a new user
// router.post("/register", [
//   check("name", "Name is required").notEmpty(),
//   check("email", "Valid email required").isEmail(),
//   check("password", "Min 6 characters").isLength({ min: 6 })
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   const { name, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: "User already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
//     res.json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // Login
// router.post("/login", [
//   check("email", "Valid email required").isEmail(),
//   check("password", "Password is required").exists()
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
//     res.json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router;


// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Import the User model

// const router = express.Router();

// // Register
// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const newUser = new User({ name, email, password: hashedPassword });
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // Logout
// router.post('/logout', (req, res) => {
//     res.json({ message: 'Logged out' });
// });

// module.exports = router;

const user=require("../models/User.js");
const bcrypt=require("bcryptjs");


const registerUser=async(req,res)=>{
    console.log(req.body);
    const {name,email,password}=req.body;
    try{
        const userExists=await user.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new user({name,email,password:hashedPassword});
        const savedUser=await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const userExists=await user.findOne({email});
        if(!userExists){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch=await bcrypt.compare(password,userExists.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        res.json({message:"Login successful"});
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports={registerUser,loginUser};