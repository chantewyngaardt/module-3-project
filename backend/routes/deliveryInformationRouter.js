import express from 'express'
import {getDeliveryInformationCon, getSingleDeliveryInformationCon, insertDeliveryInformationCon, deleteDeliveryInformationCon, updateDeliveryInformationCon} from "../controller/deliveryInformationController.js"

const router = express.Router()

router.get('/delivery_information', getDeliveryInformationCon)
router.get('/delivery_information/:delivery_id', getSingleDeliveryInformationCon)
router.post('/delivery_information', insertDeliveryInformationCon)
router.delete('/delivery_information/:delivery_id', deleteDeliveryInformationCon)
router.patch('/delivery_information', updateDeliveryInformationCon)

export default router