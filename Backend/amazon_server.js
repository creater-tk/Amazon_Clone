import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv'

import connect_DataBase from './MongoDB_Connection/mongoDB.js';
import Storage from './File_Handle/file_Handling.js';
import { addProduct, getAllProducts, removeProduct, resultedProducts } from './Controller/productController.js';
import { userRegistration,userLogin, getUserDetails,updateUserDetails } from './Controller/userController.js';

import verifyUser from './MiddleWare/authentication.js';


const Upload = multer({storage:Storage})
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/images', express.static('Uploads/Images'))

//Products api
app.post('/addProduct', Upload.single('image'), addProduct)
app.get('/viewProducts', getAllProducts);
app.post('/removeProduct', removeProduct);
app.post('/results', resultedProducts);


//User api
app.post('/register', userRegistration);
app.post('/login', userLogin);
app.post('/userDetails', verifyUser, getUserDetails)
app.put('/update', updateUserDetails)



connect_DataBase();

app.listen(3000, ()=>{
  console.log("App Running at localhost:3000")
})