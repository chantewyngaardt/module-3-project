import express from 'express'
import { getCartCon, addToCartCon, updateCartCon, removeFromCartCon} from '../controller/cartController.js'

const router = express.Router()

router.get('/:userId', getCartCon)
router.post('/', addToCartCon)
router.put('/', updateCartCon)
router.delete('/:cartId', removeFromCartCon)

export default router