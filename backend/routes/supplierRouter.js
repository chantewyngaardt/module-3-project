// filepath: /c:/Users/Student/Documents/module-3-project/backend/routes/supplierRoutes.js
import express from 'express';
import { getSupplierOrdersCon, updateSupplierOrderCon, deleteSupplierOrderCon, restoreSupplierOrderCon } from '../controller/supplierController.js';

const router = express.Router();

router.get('/supplier_orders/:supplierId', getSupplierOrdersCon);
router.put('/supplier_orders/:orderId', updateSupplierOrderCon);
router.delete('/supplier_orders/:orderId', deleteSupplierOrderCon);
router.post('/supplier_orders/restore/:orderId', restoreSupplierOrderCon);

export default router;