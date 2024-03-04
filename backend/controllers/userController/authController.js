import User from '../../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import OTP from '../../model/otpModel.js'
import nodemailer from 'nodemailer'

// api/v1/login
//Post
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Please enter email!' })
    }
    if (!password) {
      return res.status(400).json({ message: 'Please enter password!' })
    }

    // Find the user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Please register your account!' })
    }

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    // Token generation
    const id = user._id
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TOKEN_LIFE,
    })
    return res.status(200).json({ message: 'Login successful', user, token })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Some error occurred. Please try again!' })
  }
}


// api/v1/register
//Post

export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword, name } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Please enter email !' })
    }
    if (!password) {
      return res.status(400).json({ message: 'Please enter password !' })
    }
    if (!name) {
      return res.status(400).json({ message: 'Please enter your name !' })
    }
    if (!confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Please enter Conform password !' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists !' })
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match !' })
    }

    // Hash passwords
    const hashedPassword = await bcrypt.hash(password, 12)
    const hashedConfirmPassword = await bcrypt.hash(password, 12)

    // Create and save the user
    const user = new User({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      name,
    })
    await user.save()

 
    return res
      .status(201)
      .json({ message: 'Verify your email address !', user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
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

    await res.status(200).json({ message: 'otp saved', otp })

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
      from: 'rahulrjev@gmail.com',
      to: `${email}`,
      subject: 'Email Verification from Quilon !',
      text: `${otp}`,
    }

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Some Error occured .. Regerate the otp!', error)
      } else {
        res
          .status(200)
          .json({ message: 'Verification email is sent to your gmail !' })
        console.log('Email sent:', info.response)
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}



// Post
// api/v1/otp-regeneration
// --- user

export const otpRegeneration=async(req,res)=>{
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

    await res.status(200).json({ message: 'otp saved', otp })

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
      from: 'rahulrjev@gmail.com',
      to: `${email}`,
      subject: 'Email Verification from Quilon !',
      text: `${otp}`,
    }

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Some Error occured .. Regerate the otp!', error)
      } else {
        res
          .status(200)
          .json({ message: 'Verification email is sent to your gmail !' })
        console.log('Email sent:', info.response)
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// Post
// api/v1/otp-verification
// --- user
export const otpVerification = async (req, res) => {
  try {
    console.log("executed")
    console.log(req.body)
    const { userEmail, otp } = req.body;

    if ( !otp) {
      return res.status(400).json({ message: 'OTP is required field !' });
    }

    const response = await OTP.find({ email: userEmail }).sort({ createdAt: -1 }).limit(1);

   

    if (!response || response.length === 0 || response[0].otp === '') {
      return res.status(404).json({ message: 'Your OTP is expired. Please regenerate!' });
    }
    console.log(otp)
    if (response[0].otp == otp) {
      console.log("executed 3")
      return res.status(200).json({ message: "You are successfully registered!" });
    } else {
      return res.status(400).json({ message: "Your OTP is incorrect!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some Error occurred. Try again!' });
    throw err;
  }
};

// Post
// api/v1/forgetPassword
// --- user

export const forgetPassword = async (req, res) => {
  // Logic for forget password
};

export const resetPassword = async (req, res) => {
  // Logic for reset password
};