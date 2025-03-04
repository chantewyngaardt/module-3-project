import express from 'express';
import { getDeliveriesCon, updateDeliveryStatusCon, deleteDeliveryCon, restoreDeliveryCon } from '../controller/deliveryController.js';

const router = express.Router();

router.get('/deliveries/:deliveryId', getDeliveriesCon);
router.put('/deliveries/:deliveryId', updateDeliveryStatusCon);
router.delete('/deliveries/:deliveryId', deleteDeliveryCon);
router.post('/deliveries/restore/:deliveryId', restoreDeliveryCon);

export default router;