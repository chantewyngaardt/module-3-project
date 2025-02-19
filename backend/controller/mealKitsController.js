import { getMealKits } from "../model/mealKitsModel.js"

const getMealKitsCon = async(req,res)=>{

    res.json({mealKits: await getMealKits()})

}

export {getMealKitsCon}