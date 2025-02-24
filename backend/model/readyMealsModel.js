import { pool } from "../config/config.js";

const getReadyMeals = async () => {
  let [data] = await pool.query("SELECT * FROM ready_meal");
  return data;
};

const getSingleReadyMeal = async(id)=>{
  let [data] = await pool.query('SELECT * FROM ready_meal WHERE ready_meal_id = ?', [id])
  return data.length ? data[0] : null;
}

const patchReadyMeals = async (
meal_name,
description,
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
    await pool.query('UPDATE `ready_recipes`.`meal_kits` SET `meal_name` = ?, `description` = ?, `price` = ?, `category` = ?, `cuisine` = ?, `ingredients` = ?, `calories` = ?, `dietary_info` = ?, `image_url` = ?, `stock_quantity` = ?, `created_at` = ? WHERE (`meal_kit_id` = ?)', [
meal_name,
description,
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

export { getReadyMeals,patchReadyMeals,getSingleReadyMeal  };
