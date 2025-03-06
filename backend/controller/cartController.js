import { getCart, addToCart, updateCart, removeFromCart } from '../model/cartModel.js'; // Corrected import

// get user's cart
const getCartCon = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await getCart(userId);
        res.json({ cart: cart });
    } catch (error) {
        console.error("Error getting cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// add item to cart
const addToCartCon = async (req, res) => {
    const { user_id, meal_kit_id, ready_meal_id, meal_details, quantity, subtotal } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        await addToCart(user_id, meal_kit_id, ready_meal_id, meal_details, quantity, subtotal);
        res.json({ message: "Item added to cart" });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// update cart item quantity
const updateCartCon = async (req, res) => {
    const { cart_id, quantity, subtotal } = req.body;
    try {
        await updateCart(cart_id, quantity, subtotal);
        res.json({ message: "Cart updated" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// remove item from cart, or decrease quantity if more than 1
const removeFromCartCon = async (req, res) => {
    const { cartId } = req.params;
    try {
        await removeFromCart(cartId);
        res.json({ message: "Item removed from cart or quantity decreased" });
    } catch (error) {
        console.error("Error removing/updating cart item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export { getCartCon, addToCartCon, updateCartCon, removeFromCartCon };