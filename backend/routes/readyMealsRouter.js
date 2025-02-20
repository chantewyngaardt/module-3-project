import express from 'express'
import { getReadyMealCon, patchReadyMealCon, getSingleReadyMealCon } from '../controller/readyMealsController.js'

const router = express.Router()

router.get('/',getReadyMealCon)
router.get('/:id',getSingleReadyMealCon)
router.patch('/:id',patchReadyMealCon)


export default router