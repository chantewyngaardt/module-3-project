import { pool } from '../config/config.js';

const createOrderModel = async (orderData) => {
    const { phoneNumber, address, city, postalCode, paymentMethod, cardNumber, expiryDate, cvv, totalPrice } = orderData;

    const query = `INSERT INTO order_management (phone_number, address, city, postal_code, payment_method, card_number, expiry_date, cvv, total_price, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`;
    const values = [phoneNumber, address, city, postalCode, paymentMethod, cardNumber, expiryDate, cvv, totalPrice];

    try {
        const [result] = await pool.execute(query, values);
        return { orderId: result.insertId };
    } catch (error) {
        throw error;
    }
};

const getPendingOrdersModel = async () => {
    const query = "SELECT * FROM order_management WHERE status = 'pending'";
    try {
        const [orders] = await pool.execute(query);
        return orders;
    } catch (error) {
        throw error;
    }
};

export { createOrderModel, getPendingOrdersModel };
