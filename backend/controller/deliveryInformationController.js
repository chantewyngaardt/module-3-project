// controller/deliveryInformationController.js
import {
    getDeliveryInformation,
    getSingleDeliveryInformation,
    insertDeliveryInformation,
    deleteDeliveryInformation,
    updateDeliveryInformation,
} from "../model/deliveryInformationModel.js";

const getDeliveryInformationCon = async (req, res) => {
    try {
        res.json({ deliveryInformation: await getDeliveryInformation() });
    } catch (error) {
        console.error("Error getting delivery information:", error);
        res.status(500).json({ error: "Failed to get delivery information" });
    }
};

const getSingleDeliveryInformationCon = async (req, res) => {
    try {
        res.json({ deliveryInformation: await getSingleDeliveryInformation(req.params.delivery_id) });
    } catch (error) {
        console.error("Error getting single delivery information:", error);
        res.status(500).json({ error: "Failed to get delivery information" });
    }
};

const insertDeliveryInformationCon = async (req, res) => {
    let { phone_number, address_line, city, postal_code } = req.body;
    try {
        res.json({
            delivery_information: await insertDeliveryInformation(phone_number, address_line, city, postal_code),
        });
    } catch (error) {
        console.error("Error inserting delivery information:", error);
        res.status(500).json({ error: "Failed to insert delivery information" });
    }
};

const deleteDeliveryInformationCon = async (req, res) => {
    try {
        res.json({ deliveryInformation: await deleteDeliveryInformation(req.params.delivery_id) });
    } catch (error) {
        console.error("Error deleting delivery information:", error);
        res.status(500).json({ error: "Failed to delete delivery information" });
    }
};

const updateDeliveryInformationCon = async (req, res) => {
    let { phone_number, address_line, city, postal_code } = req.body;
    try {
        res.json({
            deliveryInformation: await updateDeliveryInformation(
                req.params.delivery_id,
                phone_number,
                address_line,
                city,
                postal_code
            ),
        });
    } catch (error) {
        console.error("Error updating delivery information:", error);
        res.status(500).json({ error: "Failed to update delivery information" });
    }
};

export {
    getDeliveryInformationCon,
    getSingleDeliveryInformationCon,
    insertDeliveryInformationCon,
    deleteDeliveryInformationCon,
    updateDeliveryInformationCon,
};