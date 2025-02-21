import { pool } from "../config/config.js";

const getMealKits = async () => {
  let [data] = await pool.query("SELECT * FROM meal_kits");
  return data;
};

const getSingleMealKit = async(id)=>{
  let [data] = await pool.query('SELECT * FROM meal_kits WHERE meal_kit_id = ?', [id])
  return data.length ? data[0] : null;
}

const patchMealKits = async (
meal_kit_name,
meal_description,
price,
category,
cuisine,
ingredients,
calories,
dietary_info,
image_url,
stock_quantity,
created_at,
id
) => {
    await pool.query('UPDATE `ready_recipes`.`meal_kits` SET `meal_kit_name` = ?, `meal_description` = ?, `price` = ?, `category` = ?, `cuisine` = ?, `ingredients` = ?, `calories` = ?, `dietary_info` = ?, `image_url` = ?, `stock_quantity` = ?, `created_at` = ? WHERE (`meal_kit_id` = ?)', [
meal_kit_name,
meal_description,
price,
category,
cuisine,
ingredients,
calories,
dietary_info,
image_url,
stock_quantity,
created_at,
id
])
};

export { getMealKits,patchMealKits,getSingleMealKit  };
