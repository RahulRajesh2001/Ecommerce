import jwt from 'jsonwebtoken'

// POST
// api/v1/admin/login
// --- admin

export const AdminLogin = (req, res) => {
  console.log('this is body', req.body)
  const admin = {
    email: 'rahulrjev@gmail.com',
    password: 'Rahul@123',
  }
  try {
    const { email, password } = req.body
    if (email === admin.email && password === admin.password) {
      const token = jwt.sign(
        { email: admin.email },
        process.env.JWT_ADMIN_SECRET,
        {
          expiresIn: process.env.JWT_TOKEN_LIFE,
        }
      )
      res.status(200).json({ message: 'Successfully Loggined', token })
    } else {
      res
        .status(401)
        .json({ message: 'Unauthorized: Incorrect email or password!' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}
