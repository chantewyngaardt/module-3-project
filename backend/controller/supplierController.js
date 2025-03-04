import { getSupplierOrders, updateSupplierOrder, deleteSupplierOrder, restoreSupplierOrder } from '../model/supplierModel.js';

// Get supplier orders
const getSupplierOrdersCon = async (req, res) => {
  const { supplierId } = req.params;
  try {
    const orders = await getSupplierOrders(supplierId);
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update supplier order status
const updateSupplierOrderCon = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    await updateSupplierOrder(orderId, status);
    res.json({ message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete supplier order
const deleteSupplierOrderCon = async (req, res) => {
  const { orderId } = req.params;
  try {
    await deleteSupplierOrder(orderId);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Restore supplier order
const restoreSupplierOrderCon = async (req, res) => {
  const { orderId } = req.params;
  try {
    await restoreSupplierOrder(orderId);
    res.json({ message: "Order restored" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getSupplierOrdersCon, updateSupplierOrderCon, deleteSupplierOrderCon, restoreSupplierOrderCon };