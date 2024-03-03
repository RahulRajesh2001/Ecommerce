import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import { connectDB } from '../backend/config/db.js';


connectDB()
const PORT = process.env.PORT
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import userRouters from '../backend/routes/userRoutes.js'
import adminRouters from '../backend/routes/adminRoutes.js'
import authRouter from '../backend/routes/authRoutes.js';


app.use('/api/v1',userRouters)
app.use('/api/v1/admin',adminRouters)
app.use('/api/v1/auth', authRouter);


app.listen(3000, () => {
  console.log(`Server started on ${PORT}`)
}) 
