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
}

// add an item to the cart
const addToCart = async(userId, mealKitId, readyMealId, mealDetails)