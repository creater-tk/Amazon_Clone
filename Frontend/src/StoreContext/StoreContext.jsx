import { Navigate, useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{
  const Backend_url = 'http://localhost:3000';

  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userToken = localStorage.getItem("token");
  let userId;
  if(user){
    userId = user._userId;
  }

  const [loginStatus, setLoginStatus] = useState(false)
  const [getProduct, setGetProduct] = useState('');
  const [cartData, setCartData] = useState([]);
  const [noOfCartItems, setNoOfCartItems] = useState(0);

  const [productPreview, setProductPreview] = useState({});

  const [allProducts, setAllProducts] = useState([]);

  const updateCart = async (productId, action) =>{
    try {
      const existingUser = await axios.post(`${Backend_url}/userDetails`, {_id:userId}, {headers:{token:userToken}});

      let updateUserCart = existingUser.data.data.cartInfo;


      if(action === "Add"){

        setCartData(updateUserCart);
        if(updateUserCart.length===0){
          updateUserCart.push({productId, quantity:1});
        }else{
          let productExists = false;
  
          for (let item of updateUserCart){
            if(item.productId === productId){
              item.quantity +=1;
              productExists = true;
              break;
            }
          }
  
          if(!productExists){
            updateUserCart.push({productId, quantity:1})
          }
        }
      }else if(action === "Delete"){
        const itemIndex = updateUserCart.findIndex(item => item.productId === productId)
        if(itemIndex !== -1){
          updateUserCart.splice(itemIndex, 1);
        }
      }

      const response = await axios.put(`${Backend_url}/update`, {_id:userId, updatedData:{cartInfo:updateUserCart}})
      if(response.data.success){
        setCartData(updateUserCart);
        localStorage.setItem("userCart", JSON.stringify(updateUserCart))
        return toast.success(action === "Add"?"Added To Cart":"Removed");
      }else{
        return toast.error("Failded to update try afterSometime")
      }
    } catch (error) {
      return toast.error(error.message)
    }
  }

  const fecthAllProducts = async ()=>{
    try {
      const response = await axios.get(`${Backend_url}/viewProducts`);
      if(response.data.success){
        return setAllProducts(response.data.data);
      }else{
        return toast.error(response.data.message);
      }
    } catch (error) {
      return toast.error(`Error:${error.message}`)
    }
  }

  useEffect(()=>{
    const storedCartData = JSON.parse(localStorage.getItem("userCart"));
    if(storedCartData){
      setCartData(storedCartData);
    }
  },[])

  const contextValue = {
    Backend_url,
    loginStatus, 
    setLoginStatus,
    setGetProduct,
    getProduct,
    updateCart,
    cartData,
    fecthAllProducts,
    allProducts, 
    setProductPreview,
    productPreview,
    loading,
    setLoading,
    userId,
    setNoOfCartItems,
    noOfCartItems
  }
  return(
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
