import mongoose from "mongoose";
import orderSchema from "../Models/orderModel.js";
import { User } from "./userController.js";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51Py2qoGLH5PFdEEH85JuzCOT4gxwDoSVwCr4urdHHdWM5deAVvfFhRWaXVp8AmXZNiyTQFEVcfMD3HiAphXGkLdM00wpple75l");

const orderModel = mongoose.model("Orders", orderSchema);

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Validate inputs
    if (!userId || !Array.isArray(items) || items.length === 0 || !amount || !address) {
      return res.status(400).send({ success: false, message: "Invalid input data" });
    }

    const newOrder = new orderModel({ userId, items, amount, address });
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartInfo: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.new_price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 40 * 100,
      },
      quantity: 1,
    });

    // Ensure no NaN values
    if (line_items.some((item) => isNaN(item.price_data.unit_amount) || isNaN(item.quantity))) {
      return res.status(400).send({ success: false, message: "Invalid item prices or quantities" });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.status(200).send({ success: true, message: "Payment Successful", session_url: session.url });
  } catch (error) {
    return res.status(400).send({ success: false, message: `Payment Failed: ${error.message}` });
  }
};

const verifyOrder = async (req, res)=>{
  try {
    const {orderId, success} = req.body;
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId, {payment:true});
      res.status(200).send({success:true, message:"Payment Successfull"})
    }else if(success=="false"){
      await orderModel.findByIdAndDelete(orderId)
      res.send({success:false, message:'Payment Failded!'})
    }
  } catch (error) {
    res.status(400).send({success:false, message:error.message});
  }
}

const viewOrders = async (req, res)=>{
  try {
   const orderId = req.body.orderId;
   const orderedItems =  await orderModel.find({_id:orderId})
    res.status(200).send({success:true, data:orderedItems})
  } catch (error) {
    console.log(error);
    res.status(400).send({success:false, message:'Error'})
  }
}
export {placeOrder, verifyOrder, viewOrders};
