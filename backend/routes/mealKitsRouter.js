import express from 'express'
import {getMealKitsCon} from '../controller/mealKitsController.js'

const router = express.Router()

router.get('/',getMealKitsCon)

export default router