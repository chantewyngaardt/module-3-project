import { getMealKits, getSingleMealKit, patchMealKits } from "../model/mealKitsModel.js";

const getMealKitsCon = async (req, res) => {
  res.json({ mealKits: await getMealKits() });
};

const getSingleMealKitCon = async (req,res) =>{
  res.json({mealKits: await getSingleMealKit(req.params.id)})
}

const patchMealKitsCon = async (req, res) => {
  let {
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
  } = req.body;
  created_at = created_at.replace('T',' ').replace('Z','')
  let { id } = req.params;
  await patchMealKits(meal_kit_name,meal_description,price,category,cuisine,ingredients,calories,dietary_info,image_url,stock_quantity,created_at,id),
  res.json({
    message: 'Update successful'
  });
};
export { getMealKitsCon, patchMealKitsCon, getSingleMealKitCon };
