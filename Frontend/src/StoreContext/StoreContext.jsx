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

  const [cartItems, setCartItems] = useState([]);
  const [showContainer, setShowContainer] = useState(false);
  const [cartTotal, setCartTotal] = useState({ quantity: 0, total: 0 });

  const arrivalDate = () => {
    const today = new Date();

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = nextWeek.toLocaleDateString(undefined, options);

    return (
      <h2 style={{ color: 'green' }}>Arriving {formattedDate}</h2>
    );
  };

  const updateCart = async (productId, action) =>{
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
  }

  const fecthAllProducts = async ()=>{
    const response = await axios.get(`${Backend_url}/viewProducts`);
    if(response.data.success){
      return setAllProducts(response.data.data);
    }else{
      return toast.error(response.data.message);
    }
  }
  const findProduct = () => {
    if (cartData.length > 0 && allProducts.length > 0) {
      let totalQuantity = 0;
      let totalPrice = 0;
      const items = cartData.map(eachCartItem => {
        const product = allProducts.find(eachProduct => eachCartItem.productId === eachProduct._id);
        if (product) {
          totalQuantity += eachCartItem.quantity;
          totalPrice += product.new_price * eachCartItem.quantity;
          return {
            ...product,
            quantity:eachCartItem.quantity
          }
        }
        return null;
      }).filter(item => item !== null);

      setCartItems(items);
      setCartTotal({ quantity: totalQuantity, total: totalPrice });
      setShowContainer(items.length > 0);
      setNoOfCartItems(totalQuantity)
    }
  };

  useEffect(()=>{
    const storedCartData = JSON.parse(localStorage.getItem("userCart"));
    if(storedCartData){
      setCartData(storedCartData);
    }
  },[])

  const contextValue = {
    arrivalDate,
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
    noOfCartItems,
    findProduct,
    cartItems,
    showContainer,
    cartTotal,
    userToken,
    setCartData
  }
  return(
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
