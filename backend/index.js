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

const app = express();

// 🔹 Enable Cookies & CORS
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:8080", // Change this to match your frontend
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

// ✅ Start Server
app.listen(3000, () => {
  console.log('Server running on: http://localhost:3000/');
});
