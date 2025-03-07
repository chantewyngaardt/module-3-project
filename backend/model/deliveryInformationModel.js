import { pool } from "../config/config.js";
const insertDeliveryInformation = async (phone_number, address_line1, city, postal_code) => {
    const [result] = await pool.query(
        'INSERT INTO `ready_recipes`.`delivery_information_checkout` (`phone_number`, `address_line1`, `city`, `postal_code`) VALUES (?, ?, ?, ?)',
        [phone_number, address_line1, city, postal_code]
    );
    return result;
};
const updateDeliveryInformation = async (phone_number, address_line1, city, postal_code) => {
    await pool.query('UPDATE `ready_recipes`.`delivery_information_checkout` SET `phone_number` = ?, `address_line1` = ?, `city` = ?, `postal_code` = ? WHERE `user_id` = ?',
        [phone_number, address_line1, city, postal_code]);
    return await updateDeliveryInformation();
};
export {insertDeliveryInformation, updateDeliveryInformation}