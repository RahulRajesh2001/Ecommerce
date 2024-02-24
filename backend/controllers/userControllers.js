import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator'
import OTP from '../model/otpModel.js'

// api/v1/login
//Post
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

    //token generation
    const id=user._id;
    const token=jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'6d'})
    console.log("this is token",token)

    res.status(200).json({ message: 'Login successfull', user,token });
  } catch (err) {
    console.log('Error when login...!', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// api/v1/register
//Post

export const register = async (req, res) => { 
  try {
    const { email,  password, confirmPassword, name,otp } = req.body;

    //checking user is already login
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists..!' });
    }
    
    if (password !== confirmPassword) {
      return res.status(500).json({ message: 'Your passwords do not match..!' });
    }

    //sending otp to email
    const response=await OTP.find({email}).sort({createdAt:-1}).limit(1);
    if(response.length===0 || otp !== response[0].otp){
      return res.status(400).json({
        success:false,
        message:"The OTP is not valid"
      })
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

// api/v1/send-otp
//Post

export const sendOTP=async(req,res)=>{
      try{
        const {email}=req.body;
        //check for existing user
        const checkUserPresent=await User.findOne({email});
        //if User found with provided email
        if(checkUserPresent){
          return res.status(401).json({success:false,message:"User is already registered"});
        }

      let otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
      })
      let result=await OTP.findOne({otp:otp});
      while(result){
        otp=otpGenerator.generate(6,{
          upperCaseAlphabets:false
        });
        result=await OTP.findOne({otp:otp})
      }
      const otpPayload={email,otp};
      const otpBody=await OTP.create(otpPayload)
      res.status(200).json({
        success:true,
        message:"OTP send successfully",
        otp
      })
      }catch(err){
        console.log(err.message)
        return res.status(500).json({success:false,err:err.message})
      }
}

// GET
// api/v1/admin/getUsers
// --- admin

export const getAllUsers=async(req,res)=>{

  try{
    const users=await User.find()

    if(!users){
      return res.status(500).json({message:"There is no Users..!"})
    }

    res.status(201).json({message:"Successfull..!",users})

  }catch(err){
    console.log(err)
    throw err
  }
}