import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import { connectDB } from '../backend/config/db.js';
import cookieSession from 'cookie-session'
import passport from 'passport';


connectDB()
const PORT = process.env.PORT
const app = express()
app.use(
  cookieSession({
    name:"session",
    keys:["session"],
    maxAge:24*60*60*100
  })
)
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import userRouters from '../backend/routes/userRoutes.js'
import adminRouters from '../backend/routes/adminRoutes.js'

app.use('/api/v1',userRouters)
app.use('/api/v1/admin',adminRouters)


app.listen(3000, () => {
  console.log(`Server started on ${PORT}`)
})
