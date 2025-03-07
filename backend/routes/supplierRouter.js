import express from 'express';
import { addSupplierOrderCon, getSupplierOrdersCon, updateSupplierOrderStatusCon } from '../controller/supplierController.js';

const router = express.Router();

// Add a new supplier order
router.post('/', addSupplierOrderCon);

// Get supplier orders
router.get('/:supplier_id', getSupplierOrdersCon);

// Update supplier order status
router.put('/:supplier_order_id/status', updateSupplierOrderStatusCon);

export default router;