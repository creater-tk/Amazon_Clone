import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import userSchema from "../Models/userModel.js";


const User = mongoose.model('User', userSchema);

const createToken = (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET)
}

const userRegistration = async (req, res)=>{
  try {
    const {email, name, mobile_number, password} = req.body;

    const checkEmail = validator.isEmail(email);

    if(!checkEmail){
      return res.status(400).send({success:false, message: "You Entered MailId is Invalied. Please a valied mailId"})
    }

    const findUser = await User.findOne({
      $or:[{email}, {mobile_number}]
    });

    if(findUser){
      return res.status(400).send({success:false, message:'User already Exsits with the provided Email or mobile number try another or Just login with that'})
    }

    if(password.length<=6){
      return res.status(400).send({success:false, message: "Password must contains atleast 6 characters"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({name, email, mobile_number, password:hashedPassword});
    await newUser.save()
    return res.status(200).send({success:true, message:"User Registered Successfully"})
  } catch (error) {
    return res.status(500).send({success:false, message:`Error:${error.message}`})
  }
}


const userLogin = async (req, res)=>{
  try {
    const {email, mobile_number, password} = req.body;

    const checkEmail = validator.isEmail(email);
    if(!checkEmail){
      return res.status(400).send({success:false, message:"It seems like you entered a invalied email Id"})
    }

    const query = email?{email}:{mobile_number}
    const checkUser = await User.findOne(query);

    if(!checkUser){
      return res.status(400).send({success:false, message:"User Not found with the provided Emamil or Mobile Number"})
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password );
    if(!checkPassword){
      return res.status(400).send({success:false, message:"Incorrect password"})
    }

    const token = createToken(checkUser._id);
    res.status(200).send({success:true, message:"User Successfully loged In", token:token, _userId:checkUser._id})
  } catch (error) {
    return res.status(500).send({success:false, message:`Error: ${error.message}`})
  }
}

const getUserDetails = async (req, res)=>{
  try {
    const {_id} = req.body;
    const userDetails = await User.findOne({_id})
    if(!userDetails){
      return res.status(404).send({success:false, message:"Something went wrong plz try after some time"})
    }

   return  res.status(200).send({success:true, data:userDetails});
  } catch (error) {
    return res.status(500).send({success:false, message:`Error:${error.message}`})
  }
}

const updateUserDetails = async (req, res)=>{
  try {
    const {_id, updatedData} = req.body;
    const update = {$set:{...updatedData}}
    const updatedDetails = await User.findByIdAndUpdate(_id, update, {new:true, runValidators:true})

    return res.status(200).send({success:true, message:updatedDetails})
  } catch (error) {
    return res.status(400).send({success:false, message:error.message})
  }
}

export {userRegistration, userLogin, getUserDetails, updateUserDetails}