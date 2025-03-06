// model/deliveryInformationModel.js
import { pool } from "../config/config.js";

const getDeliveryInformation = async () => {
    try {
        let [data] = await pool.query("SELECT * FROM delivery_information_checkout");
        return data;
    } catch (error) {
        console.error("Error getting delivery information:", error);
        throw error;
    }
};

const getSingleDeliveryInformation = async (delivery_id) => {
    try {
        let [data] = await pool.query("SELECT * FROM delivery_information_checkout WHERE delivery_id = ?", [delivery_id]);
        return data;
    } catch (error) {
        console.error("Error getting single delivery information:", error);
        throw error;
    }
};

const insertDeliveryInformation = async (phone_number, address_line, city, postal_code) => {
    try {
        const [result] = await pool.query(
            "INSERT INTO `ready_recipes`.`delivery_information_checkout` (`phone_number`, `address_line`, `city`, `postal_code`) VALUES (?, ?, ?, ?)",
            [phone_number, address_line, city, postal_code]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error inserting delivery information:", error);
        throw error;
    }
};

const deleteDeliveryInformation = async (delivery_id) => {
    try {
        const [result] = await pool.query("DELETE FROM `ready_recipes`.`delivery_information_checkout` WHERE (`delivery_id` = ?)", [delivery_id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error deleting delivery information:", error);
        throw error;
    }
};

const updateDeliveryInformation = async (delivery_id, phone_number, address_line, city, postal_code) => {
    try {
        const [result] = await pool.query(
            "UPDATE `ready_recipes`.`delivery_information_checkout` SET `phone_number` = ?, `address_line` = ?, `city` = ?, `postal_code` = ? WHERE `delivery_id` = ?",
            [phone_number, address_line, city, postal_code, delivery_id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating delivery information:", error);
        throw error;
    }
};

export {
    getDeliveryInformation,
    getSingleDeliveryInformation,
    insertDeliveryInformation,
    deleteDeliveryInformation,
    updateDeliveryInformation,
};