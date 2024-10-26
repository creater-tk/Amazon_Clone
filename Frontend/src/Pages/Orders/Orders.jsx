import './Orders.css'
import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from '../../StoreContext/StoreContext';
import { toast } from 'react-toastify';
import axios from 'axios'

const Orders = () => {

  const {Backend_url, userToken} = useContext(StoreContext)
  const [orders, setOrders] = useState([]);

  const dateFormate = (d, d_date=0)=>{
    const date = new Date(d);
    date.setDate(date.getDate() + d_date)
    const options = {day:'2-digit', month:'short', year:'numeric'};
    const formattedDate = date.toLocaleDateString('en-GB', options)
    return formattedDate
  }

  dateFormate('2024-10-25T03:18:13.777Z');

  const fetchOrdereditems = async () =>{
    try {
      const response = await axios.post(`${Backend_url}/orders`,{}, {headers:{token:userToken}})
      if(response.data.success){
        return setOrders(response.data.data)
      }else{
        return toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Network or server Issue");
    }
  }

  useEffect(()=>{
    fetchOrdereditems();
  },[])

  return (
    <div style={{padding:'1vw 15vw'}}>
      <h2  style={{fontWeight:'400'}}>Your Orders</h2>
      <div>
        <ul style={{display:'flex', gap:'2vw', cursor:'pointer'}}>
          <li>Orders</li>
          <li>Buy Again</li>
          <li>Not Yet Shipped</li>
          <li>Cancelled Orderes</li>
        </ul>
        <hr />

        <p><b>orders </b> placed in past 3 months</p>
        <br />
        {orders.length>0
        ?orders.map(each=>(
          <div className='orderDisplayContainer' key={each._id}>
            <ul>
              <li>ORDER PLACED <br /> {dateFormate(each.date)}</li>
              <li>TOTAL <br />{each.amount}</li>
              <li >SHIP TO <br /> {each.address.name}</li>
              <li>ORDER # {each._id}</li>
            </ul>
            <div style={{padding:'1vw', display:'grid', gridTemplateColumns:'0.7fr 0.3fr', gap:'2vw'}}>
              <div>
                <h2>Delivery {dateFormate(each.date, 7)}</h2>
                <p>Package was handed to resident</p>
                <br />
                <div style={{display:'flex', gap:'1vw'}}>
                  <img style={{width:'5vw'}} src={`${Backend_url}/Images/${each.items.map(itm=>(itm.image))}`} alt="" />
                  <div>
                    <p style={{color:'skyblue'}}>{each.items.map(itm=>(itm.description))}</p>
                    <br />
                    <div style={{display:'flex', gap:'1vw'}}>
                      <button className='primary_btn'>Buy it again</button>
                      <button style={{backgroundColor:'transparent', border:'1px solid gray'}} className='primary_btn'>View your item</button>
                    </div>
                  </div>

                </div>
              </div>
              <div className='orderModify'>
                <button>Track package</button>
                <button>Return or replace items</button>
                <button>Get help</button>
                <button>Leave seller feedback</button>
                <button>Leave delivery feedback</button>
                <button>Write a product review</button>
              </div>
            </div>
          </div>
        ))
        :<div><h2>No Orders Yet</h2></div>}
      </div>
    </div>
  )
}

export default Orders