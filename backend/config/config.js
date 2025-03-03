import mysql from 'mysql2/promise'
import {config} from 'dotenv'
config()

const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port: process.env.PORT // PORT 3308 (MACBOOK) | PORT 3306 (WINDOWS)
})

export {pool}