import { getReadyMeals,patchReadyMeals,getSingleReadyMeal } from "../model/readyMealsModel.js";

const getReadyMealCon = async (req, res) => {
  res.json({ meals: await getReadyMeals() });
};

const getSingleReadyMealCon = async (req,res) =>{
  res.json({meals: await getSingleReadyMeal(req.params.id)})
}

const patchReadyMealCon = async (req, res) => {
  let {
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
  } = req.body;
  created_at = created_at.replace('T',' ').replace('Z','')
  let { id } = req.params;
  await patchReadyMeals(meal_name,description,price,category,cuisine,ingredients,calories,dietary_info,image_url,stock_quantity,created_at,id),
  res.json({
    message: 'Update successful'
  });
};
export { getReadyMealCon, patchReadyMealCon, getSingleReadyMealCon };
