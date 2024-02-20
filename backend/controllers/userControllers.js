import User from '../model/userModel.js'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //find the user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    //compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({ message: 'Invalid password' });
    }
    res.status(200).json({ message: 'Login successfull', user });
  } catch (err) {
    console.log('Error when login...!', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword, name } = req.body;

    //checking user is already login
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists..!' });
    }

    if (password !== confirmPassword) {
      res.status(500).json({ message: 'Your password are not matching..!' });
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedConfirmPassword = await bcrypt.hash(password, 12);

    //save the user

    const user = new User({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      name,
    });
    await user.save();

    res.status(201).json({ message: 'User regitered successfully...!', user });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
