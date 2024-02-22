import mongoose from 'mongoose'
import { mailSender } from '../utils/mailSender.js'

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
      },
})

//function to send emails
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse=await mailSender(
        email,
        "Verification Email",
        `<h1>Please confirm your OTP</h1>
        <p>Here is your OTP code : ${otp}</p>`
        )
        console.log("Email send Successfully:",mailResponse)
    }catch(err){
        console.log("Error occured while sending email:",err)
        throw err
    }
}

// to save the otp
otpSchema.pre("save",async function(next){
    console.log("New document saved to the database");
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp)
    }
    next()
})

const OTP=mongoose.model("OTP",otpSchema)
export default OTP