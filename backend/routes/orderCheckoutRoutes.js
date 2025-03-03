import express from "express";
import {createOrder} from "../controller/orderCheckoutCon.js";
import {getPendingOrders} from "../controller/orderCheckoutCon.js"

const router = express.Router();

router.post("/place-order", createOrder);
router.get("/pending",getPendingOrders);

export default router;
