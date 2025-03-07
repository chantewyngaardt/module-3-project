import {insertCardDetails, updateCardDetails} from "../model/cardDetailsModel.js"
const insertCardDetailsCon = async (req, res) => {
    try {
        let { card_number, expiry_date, cvv } = req.body;
        console.log("Received Request Body:", req.body); // Debugging log
        // Check for missing fields
        if (!card_number || !expiry_date || !cvv) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const result = await insertCardDetails(card_number, expiry_date, cvv);
        res.status(201).json({ message: 'Card Details inserted successfully', result });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: 'Database error' });
    }
};
const updateCardDetailsCon = async (req, res) => {
    const { user_id } = req.params;
    const { card_number, expiry_date, cvv } = req.body;
    try {
      const query = `
        UPDATE card_details
        SET card_number = ?, expiry_date = ?, cvv = ?
        WHERE user_id = ?
    `;
      await pool.execute(query, [card_number, expiry_date, cvv, user_id]);
      res.json({ message: `Record with ID ${user_id} updated successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
export {insertCardDetailsCon, updateCardDetailsCon}