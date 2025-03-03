
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

export { getDeliveries, updateDeliveryStatus, deleteDelivery, restoreDelivery };