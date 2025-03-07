import { pool } from "../config/config.js";
const insertCardDetails = async (card_number, expiry_date, cvv) => {
    const [result] = await pool.query(
        'INSERT INTO `ready_recipes`.`card_details` (`card_number`, `expiry_date`, `cvv`) VALUES (?, ?, ?)',
        [card_number, expiry_date, cvv]
    );
    return result;
};
const updateCardDetails = async (card_number, expiry_date, cvv) => {
    await pool.query('UPDATE `ready_recipes`.`card_details` SET `card_number` = ?, `expiry_date` = ?, `cvv` = ?, WHERE `user_id` = ?',
        [card_number, expiry_date, cvv]);
    return await updateCardDetails();
};
export {insertCardDetails, updateCardDetails}