const bcrypt = require("bcryptjs")
const User = require("../models/User");
const jwt = require("jsonwebtoken");


const authService = require("../services/authService");

const registerUser = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        const user = await authService.registerUser({
            name,
            email,
            phone,
            password,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });

    } catch (error) {

        res.status(400).json({
            error: error.message,
        });

    }

};



// LOGIN USER
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        const result = await authService.loginUser({
            email,
            password,
        });

        res.status(200).json({
            message: "Login successful",
            token: result.token,
            user: {
                id: result.user._id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role,
            },
        });

    } catch (error) {

        res.status(401).json({
            error: error.message,
        });

    }

};


module.exports = {
  registerUser, loginUser,};






