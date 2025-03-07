import express from 'express'
import {insertDeliveryInformationCon, updateDeliveryInformationCon} from "../controller/deliveryInformationController.js"
const router = express.Router()
router.post('/delivery_information_checkout', insertDeliveryInformationCon)
router.patch('/delivery_information_checkout/:user_id', updateDeliveryInformationCon)
export default router