import { pool } from '../config/config.js';

const createOrderModel = async (orderData) => {
    const { phone_number, address, city, postal_code, payment_method, card_last4,total_price,expiry_date,cvv } = orderData;
console.log(orderData);

    const query = `INSERT INTO orders_management (phone_number, address, city, postal_code, payment_method, card_last4,total_price, status,expiry_date, cvv) 
                VALUES (?, ?, ?, ?, ?, ?,?, 'pending',?,?)`;
    const values = [phone_number, address, city, postal_code, payment_method, card_last4,total_price,expiry_date,cvv];

    try {
        const [result] = await pool.execute(query, values);
        return { orderId: result.insertId };
    } catch (error) {
        throw error;
    }
};

const getPendingOrdersModel = async () => {
    const query = "SELECT * FROM orders_management WHERE status = 'pending'";
    try {
        const [orders] = await pool.execute(query);
        return orders;
    } catch (error) {
        throw error;
    }
};

export { createOrderModel, getPendingOrdersModel };
