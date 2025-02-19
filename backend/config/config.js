import mmysql from 'mysql2/promise'
import {config} from 'dotenv'
config()

const pool = mmysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

export {pool}