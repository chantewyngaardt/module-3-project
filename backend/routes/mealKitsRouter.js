import express from 'express'
import {getMealKitsCon, patchMealKitsCon} from '../controller/mealKitsController.js'

const router = express.Router()

router.get('/',getMealKitsCon)
router.patch('/:id',patchMealKitsCon)
export default router