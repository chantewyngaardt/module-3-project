import express from 'express'
import {getDeliveryInformationCon, getSingleDeliveryInformationCon, insertDeliveryInformationCon, deleteDeliveryInformationCon, updateDeliveryInformationCon} from "../controller/deliveryInformationController.js"

const router = express.Router()

router.get('/delivery_information_checkout', getDeliveryInformationCon)
router.get('/delivery_information_checkout/:delivery_id', getSingleDeliveryInformationCon)
router.post('/delivery_information_checkout', insertDeliveryInformationCon)
router.delete('/delivery_information_checkout/:delivery_id', deleteDeliveryInformationCon)
router.patch('/delivery_information_checkout', updateDeliveryInformationCon)

export default router