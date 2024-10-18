import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  userId:{
    type:String, 
    required:true
  },
  productId:{
    type:String, 
    required:true
  },
  productName:{
    type:String, 
    required:true
  },
  quantity:{
    type:Number, 
    required:true
  },
  price:{
    type:Number,
    required:true
  }
});

export default cartSchema