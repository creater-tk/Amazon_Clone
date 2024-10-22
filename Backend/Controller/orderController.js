import mongoose from "mongoose";
import orderSchema from "../Models/orderModel.js";
import userModel from '../Models/userModel.js';
import Stripe from "stripe"

const stripe = new Stripe("sk_test_51Py2qoGLH5PFdEEH85JuzCOT4gxwDoSVwCr4urdHHdWM5deAVvfFhRWaXVp8AmXZNiyTQFEVcfMD3HiAphXGkLdM00wpple75l")

const Order = mongoose.model("Orders", orderSchema);

const placeOrder = async (req, res)=>{
  try {
    const newOrder = new orderModel({
      userId:req.body.userId,
      items:req.body.items,
      amount:req.body.amount,
      address:req.body.address,
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, {cartInfo:{}})

    
  } catch (error) {
    
  }
}

export default placeOrder
