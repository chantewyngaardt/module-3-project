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
app.use('/orderCheckout', orderCheckoutRouter)


app.post("/orderCheckout", (req, res) => {
    const { phone_number, address, city, postal_code, payment_method, card_number, total_price } = req.body;

    if (!phone_number || !address || !city || !postal_code || !payment_method || !payment_number || !total_price || !expiry_date || !cvv) {
        return res.status(400).json({ message: "All required fields must be filled." });
    }
    const payment_status = payment_method === "card" ? "pending" : "completed";

    const orderQuery = `
        INSERT INTO orders_management (phone_number, address, city, postal_code, payment_method, card_number, payment_status, total_price,expiry_date,cvv)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

    db.query(orderQuery, [phone_number, address, city, postal_code, payment_method, card_number, payment_status, total_price,expiry_date,cvv], (err, result) => {
        if (err) {
            console.error("Order insertion failed:", err);
            return res.status(500).json({ message: "Failed to place order." });
        }

        res.json({ message: "Order placed successfully!", orderId: result.insertId });
    });
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
    console.error("Database Error:", error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});
const insertCardDetails = async (card_number, expiry_date, cvv) => {
  const [result] = await pool.query(
    'INSERT INTO ready_recipes.card_details (card_number, expiry_date, cvv) VALUES (?, ?, ?)',
    [card_number, expiry_date, cvv]
  );
  return result;
};

app.use('/cart', cartRouter)

app.listen(3000, () => {
  console.log('Server running on: http://localhost:3000/');
});
