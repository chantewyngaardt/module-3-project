import { getDeliveries, updateDeliveryStatus, deleteDelivery, restoreDelivery, addDelivery } from '../model/deliveryModel.js';

// Get deliveries
const getDeliveriesCon = async (req, res) => {
  const { driverId } = req.params;
  try {
    const deliveries = await getDeliveries(driverId);
    res.json({ deliveries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update delivery status
const updateDeliveryStatusCon = async (req, res) => {
  const { deliveryId } = req.params;
  const { status } = req.body;
  try {
    await updateDeliveryStatus(deliveryId, status);
    res.json({ message: "Delivery status updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete delivery
const deleteDeliveryCon = async (req, res) => {
  const { deliveryId } = req.params;
  try {
    await deleteDelivery(deliveryId);
    res.json({ message: "Delivery deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Restore delivery
const restoreDeliveryCon = async (req, res) => {
  const { deliveryId } = req.params;
  try {
    await restoreDelivery(deliveryId);
    res.json({ message: "Delivery restored" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new delivery
const addDeliveryCon = async (req, res) => {
  const { order_id, driver_id, status, tracking_number } = req.body;
  try {
    console.log('Received data:', req.body);
    await addDelivery({ order_id, driver_id, status, tracking_number });
    res.status(201).json({ message: "Delivery added successfully" });
  } catch (error) {
    console.error('Error adding delivery:', error);
    res.status(500).json({ error: error.message });
  }
};

export { getDeliveriesCon, updateDeliveryStatusCon, deleteDeliveryCon, restoreDeliveryCon, addDeliveryCon };