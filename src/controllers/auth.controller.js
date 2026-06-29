const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
};

//@routes POST /api/auth/register
const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        
        if (!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const userExists = await User.findOne({email});
        if (userExists){
            return res.status(400).json({message: "User already exists"});
        }

        const user = await User.create({name, email , password});

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @route POST /api/auth/login
const loginUser = async (req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "Email and password required"});
        }

        const user = await User.findOne({email}).select("+password");

        if(!user || !await user.matchPassword(password)){
            return res.status(401).json({message:"Invalid email or password"});
        }

        res.json({
            _id:user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};

// @route GET /api/auth/me

const getMe = async (req, res) =>{
    res.json(req.user);
};

module.exports = {registerUser, loginUser, getMe};