import express from 'express'
import { config } from 'dotenv'
config()
import cors from 'cors'
import authRouter from './routes/authRouter.js'
import mealKitsRouter from './routes/mealKitsRouter.js'
import readyMealsRouter from './routes/readyMealsRouter.js'
import deliveryInformationRouter from './routes/deliveryInformationRouter.js'
import orderCheckoutRouter from './routes/orderCheckoutRoutes.js'
import cartRouter from './routes/cartRouter.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

app.use('/mealkits', mealKitsRouter)
app.use('/meals', readyMealsRouter)
app.use('/delivery_information', deliveryInformationRouter)
app.use('/orderCheckout', orderCheckoutRouter)


app.post("/orderCheckout", (req, res) => {
    // const { phone_number, address, city, postal_code, payment_method, card_last4, total_price } = req.body;

    if (!phone_number || !address || !city || !postal_code || !payment_method || !total_price || !expiry_date || !cvv) {
        return res.status(400).json({ message: "All required fields must be filled." });
    }

    const card_last4 = payment_method === "card" ? card_last4.slice(-4) : null;
    const payment_status = payment_method === "card" ? "pending" : "completed";

    const orderQuery = `
        INSERT INTO orders_management (phone_number, address, city, postal_code, payment_method, card_last4, payment_status, total_price,expiry_date,cvv)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

    db.query(orderQuery, [phone_number, address, city, postal_code, payment_method, card_last4, payment_status, total_price,expiry_date,cvv], (err, result) => {
        if (err) {
            console.error("Order insertion failed:", err);
            return res.status(500).json({ message: "Failed to place order." });
        }

        res.json({ message: "Order placed successfully!", orderId: result.insertId });
    });
});

app.use('/cart', cartRouter)

// app.get('/delivery_information',async (req, res)=>{
//     res.json({deliveryInformation: await getDeliveryInformation()})
// })

// const getDeliveryInformation = async () => {
//     let [data] = await pool.query('SELECT * FROM delivery_information_checkout')
//     return data 
// }

// app.get('/delivery_information/:delivery_id', async(req,res)=>{
//     res.json({deliveryInformation: await getSingleDeliveryInformation(req.params.delivery_id)})
// })

// const getSingledeliveryInformation = async (delivery_id) => {
//     let [data] = await pool.query('SELECT * FROM delivery_information_checkout WHERE delivery_id = ?', [delivery_id])
//     return data
// }

// app.post('/delivery_information', async (req,res) => {
//     let {phone_number, address_line, city, postal_code} = req.body
//     console.log(req.body);
//     res.json({
//         delivery_information: await insertDeliveryInformation(phone_number, address_line, city, postal_code)
//     })
// })

// const insertDeliveryInformation = async (phone_number, address_line, city, postal_code) =>{
//     await pool.query('INSERT INTO `ready_recipes`.`delivry_information_checkout` (`phone_number`, `address_line`, `city`, `postal_code`) VALUES (?, ?, ?, ?)', 
//         [phone_number, address_line, city, postal_code])
//         return await insertDeliveryInformation()
// }

// app.delete('/deliveryInformation/:delivery_id', async (req,res) => {
//     res.json({deliveryInformation: await deleteDeliveryInformation(req.params.delivery_id)})
// })

// const deleteDeliveryInformation = async (delivery_id) => {
//     await pool.query('DELETE FROM `ready_recipes`.`delivery_information_checkout` WHERE (`delivery_id` = ?)', [delivery_id])
//     return await deleteDeliveryInformation();
// }

// app.patch('/delivery_information/:delivery_id', async (req, res) => {
//     let { phone_number, address_line, city, postal_code } = req.body;
//     res.json({
//         deliveryInformation: await updateDeliveryInformation(req.params.delivery_id, phone_number, address_line, city, postal_code)
//     });
// });

// const updateDeliveryInformation = async (delivery_id, phone_number, address_line, city, postal_code) => {
//     await pool.query('UPDATE `ready_recipes`.`delivery_information_checkout` SET `phone_number` = ?, `address_line` = ?, `city` = ?, `postal_code` = ? WHERE `delivery_id` = ?',
//         [phone_number, address_line, city, postal_code, delivery_id]);
//     return await updateDeliveryInformation();
// };

app.listen(3000, () => {
    console.log('http://localhost:3000/')
})