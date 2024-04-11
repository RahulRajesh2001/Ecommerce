import express from 'express'
import dotenv, { config } from 'dotenv'
import cors from 'cors'
dotenv.config()
import { connectDB } from '../backend/config/db.js'
import Razorpay from 'razorpay'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

connectDB()
const PORT = process.env.PORT
const app = express()

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import userRouters from '../backend/routes/userRoutes.js'
import adminRouters from '../backend/routes/adminRoutes.js'
import authRouter from '../backend/routes/authRoutes.js'
import paymentRoutes from '../backend/routes/paymentRoutes.js'

// Get directory path using import.meta.url
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// const userBuildPath = path.join(__dirname, '../user/dist')
// const adminBuildPath = path.join(__dirname, '../admin/dist')
// app.use(express.static(userBuildPath))
// app.use(express.static(adminBuildPath))


// // console.log(userBuildPath);
// app.get('/*', function (req, res) {
//   console.log("sugunan");
//   // res.write('sugunan')
//   // res.end();
//   res.sendFile(
//       path.join(__dirname, "../user/dist/index.html"),
//       function (err) {
//           if (err) {
//               res.status(500).send(err);
//           }
//       }
//   );
// })



app.use('/api/v1', userRouters)
app.use('/api/v1/admin', adminRouters)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1', paymentRoutes)

app.get('/api/getkey', (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
)


// app.get("/adminpanel*", function (req, res) {
//   res.sendFile(
//       path.join(__dirname, "../admin/dist/index.html"),
//       function (err) {
//           if (err) {
//               res.status(500).send(err);
//           }
//       }
//   );
// });



app.listen(3000, () => {
  console.log(`Server started on ${PORT}`)
})
