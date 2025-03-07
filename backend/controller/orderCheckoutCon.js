import dotenv from 'dotenv';
import { createOrderModel, getPendingOrdersModel} from '../model/orderCheckoutModel.js';

dotenv.config();

const createOrder = async (req, res) => {
  // console.log("Khanyiso was here");
  
  try {
    const orderId = await createOrderModel(req.body);
    // console.log("Khanyiso was here 2");
    res.status(201).json({ message: "Order placed successfully!", orderId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPendingOrders = async (req, res) => {
  try {
    const orders = await getPendingOrdersModel();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export{createOrder, getPendingOrders}