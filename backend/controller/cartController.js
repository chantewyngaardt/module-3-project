import {getCart, addToCart, removeFromCart} from '../model/cartModel.js'

// get user's cart 
const getCartCon = async(req,res)=>{
    const {userId} = req.params
    res.json({cart: await getCart(userId)})
}

// add item to cart
const addToCartCon = async(req, res) =>{
    const {user_id, meal_kit_id, ready_meal_id, meal_details, quantity, subtotal} = req.body
    await addToCart(user_id, meal_kit_id, ready_meal_id, meal_details, quantity, subtotal)
    res.json({message: "Item added to cart"})
}

// update cart item quantity
const updateCartCon = async(req,res)=>{
    const {cart_id, quantity, subtotal} = req.body
    await updateCart(cart_id, quantity, subtotal)
    res.json({message: "Cart updated"})
}

// remove item from cart
const removeFromCartCon = async(req,res)=>{
    const {cartId} = req.params
    await removeFromCart(cartId)
    res.json({message: "Item removed from cart"})
}

export { getCartCon, addToCartCon, updateCartCon, removeFromCartCon}