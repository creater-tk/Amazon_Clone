import mongoose from "mongoose";

const productScheme = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  brand:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  old_price:{
    type:Number,
    required:true
  },
  new_price:{
    type:Number,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  rating:{
    type:Number
  }
})

export default productScheme