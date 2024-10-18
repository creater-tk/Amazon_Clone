import mongoose from "mongoose";
import cartSchema from "../Models/cartModel.js";


const Cart = mongoose.model('userCart', cartSchema);

const addToCart = async (req, res)=>{
  try {
    const {userId, productId, productName, quantity, price} = req.body
    const cartData = new Cart({userId, productId, productName, quantity, price});
    const data = await cartData.save();
    res.status(200).send({success:true, data:data})
  } catch (error) {
    res.status(400).send({success:false, message:`Error: ${error.message}`})
  }
}

export {addToCart};