import express from 'express'
import {insertCardDetailsCon, updateCardDetailsCon} from "../controller/cardDetailsController.js"

const router = express.Router()

router.post('/card_details', insertCardDetailsCon)
router.patch('/card_details/:user_id', updateCardDetailsCon)

export default router