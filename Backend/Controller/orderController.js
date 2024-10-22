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

    const line_items = req.body.items.map((item)=>({
      price_data:{
        currency:"inr",
        product_data:{
          name:item.name
        },
        unit_ammout:item.price*100
      },
      quantity:item.quantity
    }))

    line_items.push({
      price_data:{
        currency:"inr",
        product_data:{
          name:"Delivery Charges"
        },
        unit_amount:40*100
      },
      quantity:1
    })

    const session = await stripe.checkout.sessions.create({
      line_items:line_items,
      mode:"payment",
      success_url:`http://localhost:5173/verify?success:true&orderId=${newOrder._id}`,
      cancel_url:`http://localhost:5173/verify?success:false&orderId=${newOrder._id}`,
    })
    return res.status(200).send({success:true, message:"payment Successfull", session_url:session.url})
  } catch (error) {
    return res.status(400).send({success:false, message:`Payment Failded:${error.message}`})
  }
}

export default placeOrder
