import dotenv from 'dotenv';
import{getSingleUser, getSingleUserLogin} from '../model/authModel.js'
import bcrypt from 'bcryptjs';
dotenv.config();

const getLogin = async (req, res) => {
    const {email, create_password} = req.body;
    const user = await getSingleUserLogin(email,create_password);
    if(user.length > 0){
        const validPassword = await bcrypt.compare(create_password,user[0].create_password);
        if(validPassword){
            res.json({message: "Login successful"});
        }else{
            res.json({message: "Invalid password"});
        }
    }else{
        res.json({message: "User not found"});
    };
};

// const getRegister = async (req, res) => {
//     const {first_name,last_name,email,create_password,confirm_password} = req.body;
//     const user = await getSingleUser(first_name,last_name,email,create_password,confirm_password);
//     res.json({message: "Registration successful"});
// };

// export {getLogin, getRegister}

const getRegister = async (req, res) => {
    try {
        const { first_name, last_name, email, create_password, confirm_password } = req.body;

        // 🔹 Basic Validation Checks
        if (!first_name || !last_name || !email || !create_password || !confirm_password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (create_password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        if (create_password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // 🔹 Attempt to Register User
        const user = await getSingleUser(first_name, last_name, email, create_password, confirm_password);

        if (!user) {
            return res.status(500).json({ message: "User registration failed" });
        }

        res.status(201).json({ message: "Registration successful" });

    } catch (err) {
        console.error("❌ Error in getRegister:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { getLogin, getRegister };
