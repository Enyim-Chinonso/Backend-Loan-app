const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async ({ name, email, phone, password }) => {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
    });

    return user;
};



// LOGIN USER
const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        user,
    };
};

module.exports = {
    registerUser,
    loginUser,
};

