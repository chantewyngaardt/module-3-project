import { pool } from '../config/config.js';

// Get supplier orders
const getSupplierOrders = async (supplierId) => {
  const [rows] = await pool.query('SELECT * FROM supplier_orders WHERE supplier_id = ?', [supplierId]);
  return rows;
};

// Update supplier order status
const updateSupplierOrder = async (orderId, status) => {
  await pool.query('UPDATE supplier_orders SET status = ? WHERE supplier_order_id = ?', [status, orderId]);
};

// Delete supplier order
const deleteSupplierOrder = async (orderId) => {
  await pool.query('DELETE FROM supplier_orders WHERE supplier_order_id = ?', [orderId]);
};

// Restore supplier order
const restoreSupplierOrder = async (orderId) => {
  await pool.query('UPDATE supplier_orders SET deleted = 0 WHERE supplier_order_id = ?', [orderId]);
};

export { getSupplierOrders, updateSupplierOrder, deleteSupplierOrder, restoreSupplierOrder };