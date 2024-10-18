import mongoose from 'mongoose';

const connect_DataBase = ()=>{
  mongoose.connect("mongodb+srv://root:root@cluster0.c3aji.mongodb.net/Amazon_Clone");
  console.log("DataBase connected")
}

export default connect_DataBase