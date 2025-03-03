import mysql from 'mysql2/promise'
import express from 'express'
// import bodyParser from 'body-parser';
import {config} from 'dotenv'
config()
import cors from 'cors'
import authRouter from './routes/authRouter.js'

import mealKitsRouter from './routes/mealKitsRouter.js'
import readyMealsRouter from './routes/readyMealsRouter.js'
import deliveryInformationRouter from './routes/deliveryInformationRouter.js'
import cartRouter from './routes/cartRouter.js'
const app = express()

const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    // port: process.env.PORT // PORT 3308 (MACBOOK) | PORT 3306 (WINDOWS)
})

app.use(
    cors({
        origin: "http://localhost:8080",
        credentials: true
    })
)
app.use(express.json())
// app.use(bodyParser.json()); 

app.use('/auth', authRouter)


app.use('/mealkits', mealKitsRouter )
app.use('/meals', readyMealsRouter)
app.use('/delivery_information', deliveryInformationRouter)
app.use('/cart', cartRouter)

// delivery information - checkout
app.post('/delivery_information_checkout', async (req, res) => {
    try {
        let { phone_number, address_line1, city, postal_code } = req.body;
        
        console.log("Received Request Body:", req.body); // Debugging log

        // Check for missing fields
        if (!phone_number || !address_line1 || !city) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await insertDeliveryInformation(phone_number, address_line1, city, postal_code);
        
        res.status(201).json({ message: 'Delivery information inserted successfully', result });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: 'Database error' });
    }
});

const insertDeliveryInformation = async (phone_number, address_line1, city, postal_code) => {
    const [result] = await pool.query(
        'INSERT INTO `ready_recipes`.`delivery_information_checkout` (`phone_number`, `address_line1`, `city`, `postal_code`) VALUES (?, ?, ?, ?)',
        [phone_number, address_line1, city, postal_code]
    );
    return result;
};

app.patch('/delivery_information_checkout/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { phone_number, address_line1, city, postal_code } = req.body;
  
    try {
      const query = `
        UPDATE delivery_information_checkout 
        SET phone_number = ?, address_line1 = ?, city = ?, postal_code = ?
        WHERE user_id = ?
      `;
      await pool.execute(query, [phone_number, address_line1, city, postal_code, user_id]);
  
      res.json({ message: `Record with ID ${user_id} updated successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

const updateDeliveryInformation = async (phone_number, address_line1, city, postal_code) => {
    await pool.query('UPDATE `ready_recipes`.`delivery_information_checkout` SET `phone_number` = ?, `address_line1` = ?, `city` = ?, `postal_code` = ? WHERE `user_id` = ?',
        [phone_number, address_line1, city, postal_code]);
    return await updateDeliveryInformation();
};

// payment information - card details

app.post('/card_details', async (req, res) => {
    try {
        let { card_number, expiry_date, cvv } = req.body;
        
        console.log("Received Request Body:", req.body); // Debugging log

        // Check for missing fields
        if (!card_number || !expiry_date || !cvv) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await insertCardDetails(card_number, expiry_date, cvv);
        
        res.status(201).json({ message: 'Card Details inserted successfully', result });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: 'Database error' });
    }
});

const insertCardDetails = async (card_number, expiry_date, cvv) => {
    const [result] = await pool.query(
        'INSERT INTO `ready_recipes`.`card_details` (`card_number`, `expiry_date`, `cvv`) VALUES (?, ?, ?)',
        [card_number, expiry_date, cvv]
    );
    return result;
};

app.patch('/card_details/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { card_number, expiry_date, cvv } = req.body;
  
    try {
      const query = `
        UPDATE card_details 
        SET card_number = ?, expiry_date = ?, cvv = ?
        WHERE user_id = ?
      `;
      await pool.execute(query, [card_number, expiry_date, cvv, user_id]);
  
      res.json({ message: `Record with ID ${user_id} updated successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

const updateCardDetails = async (card_number, expiry_date, cvv) => {
    await pool.query('UPDATE `ready_recipes`.`card_details` SET `card_number` = ?, `expiry_date` = ?, `cvv` = ?, WHERE `user_id` = ?',
        [card_number, expiry_date, cvv]);
    return await updateCardDetails();
};

app.listen(3000, ()=>{
    console.log('http://localhost:3000/')
})
export {pool}