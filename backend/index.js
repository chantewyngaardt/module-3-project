import express from 'express'
import { config } from 'dotenv'
config()
import cors from 'cors'
import authRouter from './routes/authRouter.js'
import mealKitsRouter from './routes/mealKitsRouter.js'
import readyMealsRouter from './routes/readyMealsRouter.js'
import deliveryInformationRouter from './routes/deliveryInformationRouter.js'
import orderCheckoutRouter from './routes/orderCheckoutRoutes.js'
import cartRouter from './routes/cartRouter.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

app.use('/mealkits', mealKitsRouter)
app.use('/meals', readyMealsRouter)
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

app.use('/cart', cartRouter)

app.listen(3000, () => {
    console.log('http://localhost:3000/')
})