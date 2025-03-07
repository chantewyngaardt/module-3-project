import dotenv from 'dotenv';
import { getSingleUser, getSingleUserLogin } from '../model/authModel.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const getLogin = async (req, res) => {
    const { email, password } = req.body;

    // 🔹 Fetch user by email only
    const user = await getSingleUserLogin(email);

    if (user.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    // 🔹 Compare hashed password
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
    }

    // 🔹 Set a cookie with user_id
    res.cookie("user_id", user[0].user_id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ message: "Login successful", user: user[0] });
};


const getRegister = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone_number, role } = req.body;

        // 🔹 Basic Validation Checks
        if (!first_name || !last_name || !email || !password || !phone_number || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // 🔹 Attempt to Register User
        const user = await getSingleUser(first_name, last_name, email, password, phone_number, role);

        if (!user) {
            return res.status(500).json({ message: "User registration failed" });
        }

        res.status(201).json({ message: "Registration successful" });

    } catch (err) {
        console.error("❌ Error in getRegister:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 🔹 Logout Function to Clear Cookie
const logoutUser = async (req, res) => {
    res.clearCookie("user_token"); // Clear cookie from server
    res.json({ message: "Logout successful" });
  };

export { getLogin, getRegister, logoutUser };
