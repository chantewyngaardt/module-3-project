import { pool } from '../config/config.js';

const createOrderModel = async (orderData) => {
    const { phone_number, address, city, postal_code, payment_method, card_number,total_price,expiry_date,cvv } = orderData;
console.log(orderData);

    const query = `INSERT INTO orders_management (phone_number, address, city, postal_code, payment_method, card_number,total_price, status,expiry_date, cvv) 
                VALUES (?, ?, ?, ?, ?, ?,?, 'pending',?,?)`;
                // console.log("Khanyiso was here 3");
    const values = [phone_number, address, city, postal_code, payment_method, card_number,total_price,expiry_date,cvv];

    try {
        // console.log("Khanyiso was here 4");
        const [result] = await pool.query(query, [phone_number, address, city, postal_code, payment_method, card_number,total_price,expiry_date,cvv]);
        // console.log("Khanyiso was here 5");
        return { orderId: result.insertId };
    } catch (error) {
        throw "This is the error: " + error;
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
