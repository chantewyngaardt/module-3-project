import express from 'express'
import {config} from 'dotenv'
config()
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

// app.use('/mealkits', )

app.listen(3000, ()=>{
    console.log('http://localhost:3000/')
})