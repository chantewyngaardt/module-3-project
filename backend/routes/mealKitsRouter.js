import express from 'express'
import {getMealKitsCon, patchMealKitsCon, getSingleMealKitCon} from '../controller/mealKitsController.js'

const router = express.Router()

router.get('/',getMealKitsCon)
router.get('/:id',getSingleMealKitCon)
router.patch('/:id',patchMealKitsCon)


export default router