import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import OTP from '../model/otpModel.js'
import nodemailer from 'nodemailer'

// api/v1/login
//Post
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    //find the user
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    }
    //compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      res.status(401).json({ message: 'Invalid password' })
    }

    //token generation
    const id = user._id
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '6d' })
    console.log('this is token', token)

    res.status(200).json({ message: 'Login successfull', user, token })
  } catch (err) {
    console.log('Error when login...!', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// api/v1/register
//Post

export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword, name, otp } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash passwords
    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedConfirmPassword = await bcrypt.hash(password, 12);

    // Create and save the user
    const user = new User({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      name,
    });
    await user.save();

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// GET
// api/v1/admin/getUsers
// --- admin

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    if (!users) {
      return res.status(500).json({ message: 'There is no Users..!' })
    }

    res.status(201).json({ message: 'Successfull..!', users })
  } catch (err) {
    console.log(err)
    throw err
  }
}

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
    const secretKey = 'superSecretKey'

    if (email === admin.email && password === admin.password) {
      const token = jwt.sign({ email: admin.email }, secretKey, {
        expiresIn: '6d',
      })
      res.status(200).json({ success: true, token: token })
    } else {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: Incorrect email or password.',
      })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, error: err.message })
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
    res.status(500).json({ success: false, error: err.message })
  }
}

// Post
// api/v1/otp-generation
// --- user

export const OTPGeneration = async (req, res) => {
  try {
    const { email } = req.body
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })

    if (!otp) {
      return res.status(500).json({ message: 'Error occured..!' })
    }

    const newOtp = new OTP({
      email,
      otp,
    })
   await newOtp.save()
    
   await res.status(200).json({ message: 'otp save', otp })

    //node mailer
    // transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'rahulrjev@gmail.com',
        pass: 'xgfs dmjo nggx olwa',
      },
    })

    // Email data
    const mailOptions = {
      from:'rahulrjev@gmail.com',
      to:`${email}` ,
      subject: 'Node.js Email Tutorial',
      text: `${otp}`,
    }

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error)
      } else {
        console.log('Email sent:', info.response)
      }
    })

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Post
// api/v1/otp-verification
// --- user
export const otpVerification=async(req,res)=>{
    try{
      const {otp,userEmail}=req.body;
    // Find the most recent OTP for the email
    const response = await OTP.find({ email:userEmail}).sort({ createdAt: -1 }).limit(1);
   if(!response){
    return res.status(404).json({ message: 'No OTP found for the user' });
   }

    res.status(200).json({message:"success",response})

    }catch(err){
      res.status(500).json({ message: 'Internal server error' })
      throw err
    }
}