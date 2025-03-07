import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import mealKitsRouter from './routes/mealKitsRouter.js';
import readyMealsRouter from './routes/readyMealsRouter.js';
import deliveryInformationRouter from './routes/deliveryInformationRouter.js';
import orderCheckoutRouter from './routes/orderCheckoutRoutes.js';
import cartRouter from './routes/cartRouter.js';
import deliveryRouter from './routes/deliveryRouter.js'; // Import the delivery router
import supplierRouter from './routes/supplierRouter.js'; // Import the supplier router
import cardDetailsRouter from './routes/cardDetailsRouter.js'

const app = express();

// 🔹 Enable Cookies & CORS
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:8080", 
  credentials: true // Allow cookies
}));


app.use(express.json());

// 🔹 Routes
app.use('/auth', authRouter);
app.use('/mealkits', mealKitsRouter);
app.use('/meals', readyMealsRouter);
app.use('/delivery_information', deliveryInformationRouter);
app.use('/orderCheckout', orderCheckoutRouter);
app.use('/cart', cartRouter);
app.use('/delivery', deliveryRouter); // Register the delivery router
app.use('/supplier', supplierRouter); // Register the supplier router
app.use('/delivery_information', deliveryInformationRouter)
app.use('/card_details', cardDetailsRouter)
// delivery information - checkout
// Delivery Information - Checkout
app.post('/delivery_information_checkout', async (req, res) => {
  try {
    const { phone_number, address_line1, city, postal_code } = req.body;
    // Validate required fields
    if (!phone_number || !address_line1 || !city || !postal_code) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Insert into the database FIRST
    const result = await insertDeliveryInformation(
      phone_number,
      address_line1,
      city,
      postal_code
    );
    // THEN send the response
    res.status(201).json({
      message: 'Delivery Information inserted successfully',
      result
    });
  } catch (error) {
    res.status(500).json({
      error: 'Database error',
      details: error.message
    });
  }
});
const insertDeliveryInformation = async (phone_number, address_line1, city, postal_code) => {
  const [result] = await pool.query(
    'INSERT INTO ready_recipes.delivery_information_checkout (phone_number, address_line1, city, postal_code) VALUES (?, ?, ?, ?)',
    [phone_number, address_line1, city, postal_code]
  );
  return result;
};
// Card Details
app.post('/card_details', async (req, res) => {
  try {
    let { card_number, expiry_date, cvv } = req.body;
    // Validate required fields
    if (!card_number || !expiry_date || !cvv) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Insert into the database
    const result = await insertCardDetails(card_number, expiry_date, cvv);
    res.status(201).json({ message: 'Card Details inserted successfully', result });
  } catch (error) {
    res.status(500).json({
      error: 'Database error',
      details: error.message
    });
  }
});
const insertCardDetails = async (card_number, expiry_date, cvv) => {
  const [result] = await pool.query(
    'INSERT INTO ready_recipes.card_details (card_number, expiry_date, cvv) VALUES (?, ?, ?)',
    [card_number, expiry_date, cvv]
  );
  return result;
};
// index.js (Node.js)
app.post('/place-order', async (req, res) => {
  const { deliveryInfo, cardDetails } = req.body;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    // Insert delivery information
    const [deliveryResult] = await connection.query(
      'INSERT INTO delivery_information_checkout (phone_number, address_line1, city, postal_code) VALUES (?, ?, ?, ?)',
      [
        deliveryInfo.phone_number,
        deliveryInfo.address_line1,
        deliveryInfo.city,
        deliveryInfo.postal_code
      ]
    );
    // Insert card details
    const [cardResult] = await connection.query(
      'INSERT INTO card_details (card_number, expiry_date, cvv) VALUES (?, ?, ?)',
      [
        cardDetails.card_number,
        cardDetails.expiry_date,
        cardDetails.cvv
      ]
    );
    await connection.commit();
    res.status(201).json({
      message: 'Order placed successfully',
      deliveryResult,
      cardResult
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({
      error: 'Transaction failed',
      details: error.message
    });
  } finally {
    connection.release();
  }
});
app.get('/cart', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM cart WHERE user_id = ?',
      [req.query.user_id] // Get user_id from query parameters
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});
app.patch('/cart/:user_id', async (req, res) => {
  const { quantity } = req.body;
  await pool.query('UPDATE cart SET quantity = ? WHERE user_id = ?', [quantity, req.params.user_id]);
  res.json({ success: true });
});
app.delete('/cart/:user_id', async (req, res) => {
  await pool.query('DELETE FROM cart WHERE user_id = ?', [req.params.user_id]);
  res.json({ success: true });
});
app.get('/api/order-items', (req, res) => {
    const query = 'SELECT name, quantity, price FROM mealkits'; // Replace 'mealkits' with your actual table name
    pool.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
      } else {
        res.json(results); // Send back the fetched data
      }
    });
  });

// ✅ Start Server
app.listen(3000, () => {
  console.log('Server running on: http://localhost:3000/');
});
