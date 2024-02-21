import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import { connectDB } from '../backend/config/db.js'

connectDB()
const PORT = process.env.PORT
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import userRouters from '../backend/routes/userRoutes.js'

app.use('/api/v1',userRouters)


app.listen(3000, () => {
  console.log(`Server started on ${PORT}`)
})
