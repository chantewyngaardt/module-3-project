import {insertDeliveryInformation, updateDeliveryInformation} from "../model/deliveryInformationModel.js"


const insertDeliveryInformationCon = async (req, res) => {
    try {
        let { phone_number, address_line1, city, postal_code} = req.body;
        
        console.log("Received Request Body:", req.body); // Debugging log

        // Check for missing fields
        if (!phone_number || !address_line1 || !city || !postal_code) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await insertDeliveryInformation(phone_number, address_line1, city, postal_code);
        
        res.status(201).json({ message: 'Delivery information inserted successfully', result });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: 'Database error' });
    }
}

const updateDeliveryInformationCon = async  (req, res) => {
    const { user_id } = req.params;
    const { phone_number, address_line1, city, postal_code } = req.body;
  
    try {
      const query = `
        UPDATE delivery_information_checkout 
        SET phone_number = ?, address_line1 = ?, city = ?, postal_code = ?
        WHERE user_id = ?
      `;
      await db.execute(query, [phone_number, address_line1, city, postal_code, user_id]);
  
      res.json({ message: `Record with ID ${user_id} updated successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export {insertDeliveryInformationCon, updateDeliveryInformationCon}