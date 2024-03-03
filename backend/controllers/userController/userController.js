import User from '../../model/userModel.js'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
  try {
    const token = req.query.token
    if (!token) {
      return res
        .status(404)
        .json({ message: 'User not found .. Please login !' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: decoded.id })
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found .. Please login !' })
    }
    res.status(200).json({ message: 'Successfull', user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

export const editUser = async (req, res) => {
  try {
    const { id, name, email } = req.body
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    )
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: 'There is no User .. Please login.!' })
    }
    res.status(200).json({ message: 'Updated Successfully !', updatedUser })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}
