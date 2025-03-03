import {pool} from '../config/config.js';
import bcrypt from 'bcryptjs';

// const getSingleUser = async (first_name,last_name,email,create_password,confirm_password) => {
//     try{
//         const hasedPassword = await bcrypt.hash(create_password, 8);
//         const [data] = await pool.query('INSERT INTO register_customer_users (first_name,last_name,email,create_password,confirm_password) VALUES(?,?,?,?,?)', [first_name,last_name,email,hasedPassword,confirm_password]);
//         return data;
//     }catch(err){
//         console.log(err);
//     }
// }

const getSingleUser = async (first_name, last_name, email, create_password,confirm_password) => {
    try {
        // 🔹 Hash the password securely
        const hashedPassword = await bcrypt.hash(create_password, 8);

        // 🔹 Insert user into database (WITHOUT storing confirm_password)
        const [data] = await pool.query(
            'INSERT INTO register_customer_users (first_name, last_name, email, create_password, confirm_password) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, email, hashedPassword, confirm_password]
        );

        return data;

    } catch (err) {
        console.error("❌ Error in getSingleUser:", err);
        throw new Error("Database error while registering user");
    }
};

const getSingleUserLogin = async (email,create_password) => {
    try{
        const [data] = await pool.query('SELECT * FROM register_customer_users  WHERE email = ? AND create_password = ?', [email,create_password]);
        return data;
    }catch(err){
        console.log(err);
    }
}

export {getSingleUser, getSingleUserLogin}