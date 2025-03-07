import { addSupplierOrder, getSupplierOrders, updateSupplierOrderStatus } from '../model/supplierModel.js';

// Add a new supplier order
const addSupplierOrderCon = async (req, res) => {
  const { supplier_id, meal_kit_id, ready_meal_id, quantity, status } = req.body;
  try {
    console.log('Received data:', req.body);
    await addSupplierOrder({ supplier_id, meal_kit_id, ready_meal_id, quantity, status });
    res.status(201).json({ message: "Supplier order added successfully" });
  } catch (error) {
    console.error('Error adding supplier order:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get supplier orders
const getSupplierOrdersCon = async (req, res) => {
  const { supplier_id } = req.params;
  try {
    const orders = await getSupplierOrders(supplier_id);
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update supplier order status
const updateSupplierOrderStatusCon = async (req, res) => {
  const { supplier_order_id } = req.params;
  const { status } = req.body;
  try {
    await updateSupplierOrderStatus(supplier_order_id, status);
    res.json({ message: "Supplier order status updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addSupplierOrderCon, getSupplierOrdersCon, updateSupplierOrderStatusCon };