// filepath: c:\LCA CODE WORK\module-3-project\backend\routes\deliveryRoutes.js
import express from 'express';
import { getDeliveriesCon, updateDeliveryStatusCon, deleteDeliveryCon, restoreDeliveryCon, addDeliveryCon } from '../controller/deliveryController.js';

const router = express.Router();

// Get deliveries
router.get('/:driverid', getDeliveriesCon);

// Update delivery status
router.put('/:deliveryid/status', updateDeliveryStatusCon);

// Delete delivery
router.delete('/:deliveryid', deleteDeliveryCon);

// Restore delivery
router.put('/:deliveryid/restore', restoreDeliveryCon);

// Add a new delivery
router.post('/', addDeliveryCon);

export default router;