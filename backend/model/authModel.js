import {pool} from '../config/config.js';
import bcrypt from 'bcryptjs';

const getSingleUser = async (first_name, last_name, email, password,phone_number,role) => {
    try {
        // 🔹 Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 8);

        // 🔹 Insert user into database (WITHOUT storing confirm_password)
        const [data] = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password,phone_number,role) VALUES (?, ?, ?, ?,?,?)',
            [first_name, last_name, email, hashedPassword,phone_number,role]
        );

        return data;

    } catch (err) {
        console.error("❌ Error in getSingleUser:", err);
        throw new Error("Database error while registering user");
    }
};

const getSingleUserLogin = async (email,password) => {
    try{
        const [data] = await pool.query('SELECT * FROM users  WHERE email = ? AND password = ?', [email,password]);
        return data;
    }catch(err){
        console.log(err);
    }
}

export {getSingleUser, getSingleUserLogin}