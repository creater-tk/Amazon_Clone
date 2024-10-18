import mongoose from "mongoose"
import productScheme from "../Models/productModel.js"
import fs from 'fs'

const Product = mongoose.model('product', productScheme);

const addProduct = async (req, res)=>{
  try {
    const imagePath = `${req.file.filename}`

    const product = new Product({
      name:req.body.name,
      description:req.body.description,
      category:req.body.category,
      old_price:req.body.old_price,
      new_price:req.body.new_price,
      brand:req.body.brand,
      image:imagePath
    })

    await product.save();
    return res.status(201).send({success:true, message:"Product Saved Successfully"})
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getAllProducts = async (req, res)=>{
  try {
    const allProducts = await Product.find({});
    res.status(201);
    return res.send({success:true, data:allProducts})
  } catch (error) {
    res.status(500).send({success:false, message:"Error:"+error.message})
  }
}

const resultedProducts = async (req, res)=>{
  try {
    const {name, brand} = req.body;

    const query = {};
    if(name){
      query.name = {$regex:name, $options: 'i'};
    }

    if(brand){
      query.brand = {$regex:brand, $options:'i'};
    }

    const resultedProducts = await Product.find(query)
    res.status(200).send({success:true, data:resultedProducts})
  } catch (error) {
    res.status(500).send({success:false, message:`Error:${error.message}`})
  } 
}

const removeProduct = async (req, res)=>{
  try {
    const productId = req.body.id;
    const findProduct = await Product.findByIdAndDelete(productId);
    res.status(200)
    if(findProduct){
      fs.unlink(`Uploads/Images/${findProduct.image}`, ()=>{})
      return res.send({success:true, message:"Product Removed Successfully"})
    }else{
      return res.send({success:false, message:"It seems like producted no available in the dataBase"});
    }
  } catch (error) {
    return res.status(500).send({success:false, message:"Error:"+error.message})
  }
}

export {addProduct, getAllProducts, removeProduct, resultedProducts}