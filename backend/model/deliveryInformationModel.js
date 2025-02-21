import { pool } from "../config/config.js";

const getDeliveryInformation = async () => {
    let [data] = await pool.query('SELECT * FROM delivery_information_checkout');
    return data;
};

const getSingleDeliveryInformation = async (delivery_id) => {
    let [data] = await pool.query('SELECT * FROM delivery_information_checkout WHERE delivery_id = ?', [delivery_id])
    return data
}

const insertDeliveryInformation = async (phone_number, address_line, city, postal_code) =>{
    await pool.query('INSERT INTO `ready_recipes`.`delivry_information_checkout` (`phone_number`, `address_line`, `city`, `postal_code`) VALUES (?, ?, ?, ?)', 
        [phone_number, address_line, city, postal_code])
        return await insertDeliveryInformation()
}

const deleteDeliveryInformation = async (delivery_id) => {
    await pool.query('DELETE FROM `ready_recipes`.`delivery_information_checkout` WHERE (`delivery_id` = ?)', [delivery_id])
    return await deleteDeliveryInformation();
}

const updateDeliveryInformation = async (delivery_id, phone_number, address_line, city, postal_code) => {
    await pool.query('UPDATE `ready_recipes`.`delivery_information_checkout` SET `phone_number` = ?, `address_line` = ?, `city` = ?, `postal_code` = ? WHERE `delivery_id` = ?',
        [phone_number, address_line, city, postal_code, delivery_id]);
    return await updateDeliveryInformation();
};

export {getDeliveryInformation, getSingleDeliveryInformation, insertDeliveryInformation, deleteDeliveryInformation, updateDeliveryInformation}