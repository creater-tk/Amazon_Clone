import React, { useContext, useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../StoreContext/StoreContext.jsx';
import { toast } from 'react-toastify';

const Verify = () => {

  const {Backend_url, userToken, arrivalDate, setCartData} = useContext(StoreContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const success= searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const [orderItems, setOrderItems] = useState([])

  const verifyOrder = async ()=>{
      const response = await axios.post(`${Backend_url}/verify` , {orderId:orderId, success:success});
      if(response.data.success){
        toast.success("Order Confirmed Thank You!")
        localStorage.removeItem("userCart");
        setCartData([]);
      }else{
        toast.error(response.data.message)
      }
  }

  const displayOrders = async ()=>{
     const response = await axios.post(`${Backend_url}/orders`, {orderId:orderId}, {headers:{token:userToken}})

     if(response.data.success){
      setOrderItems(response.data.data)
     }else{
      toast.error(response.data.message)
     }
  }

  useEffect(()=>{
    verifyOrder();
    displayOrders();
  },[])

  return (
    <div style={{padding:'1vw 5vw'}}>
      <div style={{padding:'1vw', border:'1px solid gray', borderRadius:'1vw'}}>
        <h2 style={{color:'green'}}><span style={{border:'1px solid',padding:'0.3vw', borderRadius:'50%', fontSize:'0.7vw'}}>✔</span> Order place Thankyou</h2>
        <p>Confirmation will be sent to your email.</p>
        {orderItems.length>0
        ?orderItems.map(eachItem =>{
          const {name, pinCode, area, town, state, country} = eachItem.address
          return (
          <div key={eachItem._id}>
            <p><b>Shipping to {name}</b>, {pinCode}, {area}, {town}, {state}, {country}</p>

            <div  style={{display:'flex', alignItems:'center', gap:'3vw'}}>
              <div>
                {arrivalDate()}
                <p>Delivery date</p>
              </div>
              <img style={{width:'5vw'}} src={`${Backend_url}/Images/${eachItem.items.map(item=>(
                item.image
              ))}`} alt="" />
            </div>
          </div>)
        })
        :''}
      </div>

    </div>
  )
}

export default Verify