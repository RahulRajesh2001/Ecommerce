import User from "../../model/userModel.js"
// GET
// api/v1/admin/getUsers
// --- admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (!users) {
      return res.status(500).json({ message: 'There is no users.!' })
    }
    res.status(201).json({ message:'Successfull', users })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}


// GET
// api/v1/admin/blockUnblock
// --- admin

export const BlockUnblockUser = async (req, res) => {
    try {
      const { id, userStatus } = req.query
      await User.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: userStatus } },
        { new: true }
      )
      res.status(200).json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Some Error occured .. Try again !' })
      throw err
    }
  }