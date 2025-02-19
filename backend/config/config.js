import mysql from 'mysql2/promise'
import {config} from 'dotenv'
config()

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Perfectpuppy001!',
    database: 'shopleft'
})