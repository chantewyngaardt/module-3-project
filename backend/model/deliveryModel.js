import { pool } from '../config/config.js';

// Get deliveries
const getDeliveries = async (driverId) => {
  const [rows] = await pool.query('SELECT * FROM delivery WHERE driver_id = ?', [driverId]);
  return rows;
};

// Update delivery status
const updateDeliveryStatus = async (deliveryId, status) => {
  await pool.query('UPDATE delivery SET status = ? WHERE delivery_id = ?', [status, deliveryId]);
};

// Delete delivery
const deleteDelivery = async (deliveryId) => {
  await pool.query('DELETE FROM delivery WHERE delivery_id = ?', [deliveryId]);
};

// Restore delivery
const restoreDelivery = async (deliveryId) => {
  await pool.query('UPDATE delivery SET deleted = 0 WHERE delivery_id = ?', [deliveryId]);
};

// Add a new delivery
const addDelivery = async (deliveryData) => {
  const { order_id, driver_id, status, tracking_number } = deliveryData;
  const query = 'INSERT INTO delivery (order_id, driver_id, status, tracking_number) VALUES (?, ?, ?, ?)';
  console.log('Executing query:', query, [order_id, driver_id, status, tracking_number]);
  await pool.query(query, [order_id, driver_id, status, tracking_number]);
};


export { getDeliveries, updateDeliveryStatus, deleteDelivery, restoreDelivery, addDelivery };