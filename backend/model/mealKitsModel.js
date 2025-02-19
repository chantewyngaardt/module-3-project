import {pool} from '../config/config.js'

const getMealKits = async()=>{
    let [data] = await pool.query('SELECT * FROM meal_kits')
    return data 
}

export {getMealKits}