import express from 'express'
import {config} from 'dotenv'
config()
import cors from 'cors'
import mealKitsRouter from './routes/mealKitsRouter.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/mealkits', mealKitsRouter )

app.listen(3000, ()=>{
    console.log('http://localhost:3000/')
})