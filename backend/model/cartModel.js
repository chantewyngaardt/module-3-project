import {pool} from '../config/config.js'

// get users cart
const getCart = async(userId)=>{
    let [data] = await pool.query(
        `SELECT c.cart_id, c.user_id, c.meal_kit_id, c.ready_meal_id, c.meal_details, 
        c.quantity, c.subtotal, 
        mk.meal_kit_name, mk.image_url, 
        rm.meal_name AS ready_meal_name, rm.image_url AS ready_meal_image
        FROM cart c
        LEFT JOIN meal_kits mk ON c.meal_kit_id = mk.meal_kit_id
        LEFT JOIN ready_meal rm ON c.ready_meal_id = rm.ready_meal_id
        WHERE c.user_id = ?`,[userId])
        return data
};

// add an item to the cart
const addToCart = async(userId, mealKitId, readyMealId, mealDetails, quantity, subtotal) => {
    await pool.query(
        'INSERT INTO cart (user_id, meal_kit_id, ready_meal_id, meal_details, quantity, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, mealKitId || null, readyMealId || null, mealDetails || null, quantity, subtotal]
    );
};


// update item quantity
const updateCart = async (cartId, quantity, subtotal) => {
    await pool.query('UPDATE cart SET quantity = ?, subtotal = ? WHERE cart_id = ?', [quantity, subtotal, cartId])
};

// remove an item from the cart
const removeFromCart = async (cartId) => {
    const [rows] = await pool.query('SELECT quantity FROM cart WHERE cart_id = ?', [cartId]);

    if (rows.length > 0) {
        const currentQuantity = rows[0].quantity;

        if (currentQuantity <= 1) {
            // If quantity is 1 or less, delete the item
            await pool.query('DELETE FROM cart WHERE cart_id = ?', [cartId]);
        } else {
            // If quantity is more than 1, decrease it by 1
            await pool.query('UPDATE cart SET quantity = quantity - 1, subtotal = subtotal / quantity * (quantity -1) WHERE cart_id = ?', [cartId]);
        }
    }
};

export {getCart, addToCart, updateCart, removeFromCart}