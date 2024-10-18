
import { createContext, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{
  const Backend_url = 'http://localhost:3000';

  const user = JSON.parse(localStorage.getItem("user"));
  const userToken = localStorage.getItem("token");
  let userId;
  if(user){
    userId = user._userId;
  }

  const [loginStatus, setLoginStatus] = useState(false)
  const [getProduct, setGetProduct] = useState('');
  const [cartData, setCartData] = useState([]);

  const [productPreview, setProductPreview] = useState({});

  const [allProducts, setAllProducts] = useState([]);
  let quantity = 1;

  const addToCart = async (id, name, price) =>{
    try {
      const cartPayLoad = {userId:userId, productId:id, productName:name, price:price, quantity:quantity};
      const config = {
        headers:{
          token:userToken
        }
      }
      const response = await axios.post(`${Backend_url}/addToCart`, cartPayLoad, config);
      if(response.data.success){
        return setCartData((prevItems)=>([
          ...prevItems, response.data.data
        ]));
      }else{
        return toast.error(response.data.message);
      }
    } catch (error) {
      return toast.error(`Error:${error.message}`)
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


  const contextValue = {
    Backend_url,
    loginStatus, 
    setLoginStatus,
    setGetProduct,
    getProduct,
    addToCart,
    cartData,
    fecthAllProducts,
    allProducts, 
    setProductPreview,
    productPreview
  }
  return(
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
