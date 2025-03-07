import { pool } from '../config/config.js';

// Add a new supplier order
const addSupplierOrder = async (orderData) => {
  const { supplier_id, meal_kit_id, ready_meal_id, quantity, status } = orderData;
  const query = 'INSERT INTO supplier_orders (supplier_id, meal_kit_id, ready_meal_id, quantity, status) VALUES (?, ?, ?, ?, ?)';
  console.log('Executing query:', query, [supplier_id, meal_kit_id, ready_meal_id, quantity, status]);
  await pool.query(query, [supplier_id, meal_kit_id, ready_meal_id, quantity, status]);
};

// Get supplier orders
const getSupplierOrders = async (supplier_id) => {
  const [rows] = await pool.query('SELECT * FROM supplier_orders WHERE supplier_id = ?', [supplier_id]);
  return rows;
};

// Update supplier order status
const updateSupplierOrderStatus = async (supplier_order_id, status) => {
  await pool.query('UPDATE supplier_orders SET status = ? WHERE supplier_order_id = ?', [status, supplier_order_id]);
};

export { addSupplierOrder, getSupplierOrders, updateSupplierOrderStatus };