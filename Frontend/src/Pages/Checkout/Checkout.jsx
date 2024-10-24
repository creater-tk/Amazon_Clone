import React, { useState, useContext, useEffect } from 'react'
import './Checkout.css'
import { assets } from '../../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { StoreContext } from '../../StoreContext/StoreContext.jsx'
import axios from 'axios'

const Checkout = () => {

  const {cartData, allProducts, fecthAllProducts, Backend_url, cartTotal,findProduct, userToken, userId,arrivalDate} = useContext(StoreContext);
  const navigate = useNavigate();

  const [orderItems, setOrderItems] = useState([]);

  const [addAddress, setAddAddress] = useState(false)
  const [addressData, setAddressData] = useState({
    name:'',
    phone:'',
    pinCode:'',
    building:'',
    area:'',
    town:'',
    state:'Andhra Pradesh',
    country:'India'
  })
  const [showAddress, displayAddress ] = useState(false);
  const [displayAddressContainer, setAddressContainer] = useState(true);
  const [displayPayment, setDisplayPayment] = useState(false);
  const [displayDelivery, setDisplayDelivery] = useState(false);

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setAddressData(prev=>({
      ...prev, [name]:value
    }))
  }

  const addInputField = (label, type, placeholder, name, value)=>(
    <div className='secondary_input_field'>
      <label htmlFor={label}>{label}</label>
      <input onChange={onChangeHandler} type={type} placeholder={placeholder} id={label} name={name} value={value} className='secondary_input' required/>
      <br />
    </div>
  )

  const updateAddress = (e)=>{
    e.preventDefault();
    displayAddress(true);
    setAddAddress(false)
  }


  const orderedItems = ()=>{
      let orderItems = [];
      if(allProducts.length>0){
        allProducts.map(product=>{
          if(cartData.length>0){
            cartData.map(cartItem=>{
              if(cartItem.productId === product._id){
                let itemInfo = product;
                itemInfo['quantity'] = cartItem.quantity;
                orderItems.push(itemInfo)
              }
            })
          }
        })
      }
      setOrderItems(orderItems);
  }

  const placeOrder = async ()=>{
    try {
      const itemsOrdered = {
        address:addressData,
        amount:cartTotal.total,
        items:orderItems,
        userId:userId
      }

      console.log(itemsOrdered.items);

      const response = await axios.post(`${Backend_url}/placeOrder`, itemsOrdered, {headers:{token:userToken}});
      if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  useEffect(()=>{
    fecthAllProducts();
    orderedItems();
    findProduct();
    if(cartData.length === 0){
      navigate('/')
      toast.error("Something went wrong!")
    }
  },[])

  return (
    <div style={{padding:"1vw 10vw", zIndex:1}}>
      <div className='header'>
        <img style={{width:'8vw'}} src={assets.amazon_logo_dark} alt="" />
        <h2 style={{fontWeight:"400", fontSize:'2vw'}}>Checkout</h2>
        <img src={assets.lockIcon} alt="" />
      </div>

      <div className={`main_section ${addAddress?'changeOpacity':''}`}>
        <div>
          <div>
            <h2 className={`${displayAddressContainer?'pri_color':''}`}>1 Select a delivery address</h2>

          {displayAddressContainer?
            <div style={{padding:'1vw', border:'1px solid gray', borderRadius:'1vw'}}>
              <h2>Your addresses</h2>
              <hr />

              {showAddress?
                <div style={{padding:'0.65vw', backgroundColor:'lightpink'}}>
                  <input type="checkbox" id='address'/>
                  <label htmlFor='address'><b>{addressData.name}</b> ,{addressData.pinCode}, {addressData.area}, {addressData.building}, {addressData.town}, {addressData.state}, {addressData.country}, {addressData.phone}</label>
                </div>
                :''}
                <hr />
              <div>
                <p onClick={()=>setAddAddress(true)} style={{color:'blue', cursor:'pointer'}}><span style={{fontSize:'2vw', fontWeight:'bold', color:'GrayText'}}>+</span> Add a new address</p>
              </div>
              <hr />

              <div style={{display:'flex', alignItems:'center'}}>
                <img style={{width:'1.5vw'}} src={assets.amazon_location_icon} alt="" />
                <h2>Your pickup locations</h2>
              </div>
              <hr />

              <div>
                <button onClick={()=>{setDisplayPayment(true); setAddressContainer(false)}}  className={`primary_btn ${!showAddress?'disableCursor':''}`} disabled={!showAddress}>Use this address</button>
              </div>
            </div>
          :''}
          </div>
          
          <hr />
          
          <div>
            <h2 style={{color:`${displayPayment?'orangered':'black'}`}}>2 Payment method</h2>
            {displayPayment?
              <div style={{border:'1px solid gray', padding:'1vw', borderRadius:'1vw'}}>
                <h2>Payment method</h2>
                <hr />
                <div>
                  <input type="checkbox" id='upi' name='upi' />
                  <label htmlFor='upi'><b>Online payment</b></label>
                </div>

                  
                <hr />

                <div>
                  <input type="checkbox" id='cash' name='cash'/>
                  <label htmlFor='cash'><b>Cash on Delivery/Pay on Delivery</b></label>
                </div>

                <hr />

                <button onClick={()=>{setDisplayPayment(false); setDisplayDelivery(true)}} className='primary_btn'>Use this payment method</button>
              </div>
            :''}
          </div>  
          
          <hr />

          <div>
            <h2 style={{color:`${displayDelivery?'orangered':'black'}`}}>3 Items and devlivery</h2>

            {displayDelivery?
              <div style={{border:'1px solid gray', padding:'1vw', borderRadius:'1vw'}}>
                <h2>Review items and delivery</h2>
                <div>
                  {arrivalDate()}
                  <p>if you order in the next 21 hours and 44 minues ( Details ) <br /> Items dispatched by Amazon</p>

                  {orderItems.map(eachItem =>(
                    <div className='delivery_item' key={eachItem._id}>
                      <div>
                        <img style={{width:'5vw'}} src={`${Backend_url}/Images/${eachItem.image}`} alt="" />
                      </div>
                      <div>
                        <p><b>{eachItem.name} {eachItem.description}</b></p>

                        <p><span style={{color:'gray', textDecoration:'line-through'}}>₹{eachItem.old_price}</span> <b style={{color:"orangered"}}>₹{eachItem.new_price}</b></p>

                        <p>Quantity:{eachItem.quantity}</p>

                        <p style={{color:'gray'}}>Sold by: Amazon.com</p>

                        <hr />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{display:'flex', alignItems:'center', gap:'1vw'}}>
                  <button onClick={placeOrder} className='primary_btn'>Proceed to Pay</button>
                  <div>
                    <h2 style={{color:'orangered'}}>Order Total: ₹{cartTotal.total}.00</h2>
                    <p style={{color:'gray', fontSize:'0.8vw'}}>By placing your order, your agree to Amazon privacy notice and conditions</p>
                  </div>
                </div>

              </div>  
            :''}
          </div>
          <hr />

          <div>
            <p style={{fontSize:'0.8vw'}}>Need help? Check our help pages or contact us <br />
            When your order is placed, we'll send you an e-mail message acknowledging receipt of your order. If you choose to pay using an electronic payment method (credit card, debit card or net banking), you will be directed to your bank's website to complete your payment. Your contract to purchase an item will not be complete until we receive your electronic payment and dispatch your item. If you choose to pay using Pay on Delivery (POD), you can pay using cash/card/net banking when you receive your item.
            <br />
            <br />
            See Amazon.in's Return Policy.
            <br />
            <br />
            Need to add more items to your order? Continue shopping on the <Link to="/HomePage">Amazon.in homepage.</Link>
            </p>
          </div>
        </div>

        <div style={{padding:'1vw', border:'1px solid gray', borderRadius:'1vw'}}>
          <div style={{display:'flex', flexDirection:'column', gap:'1vw'}}>
            <button  className='primary_btn' disabled={addAddress}>Use this address</button>
            <p style={{textAlign:'center', fontSize:'0.8vw'}}>Choose a shipping address and payment method to calculate shipping, handling and tax.</p>
          </div>
          <br />
          <div>
            <h2>Order Summary</h2>
            <div>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <p>Items: </p>
                <p>{cartTotal.quantity}</p>
              </div>

              <div style={{display:'flex', justifyContent:'space-between'}}>
                <p>Delivery:</p>
                <p>0</p>
              </div>
            </div>
            <hr />

            <div>
              <div>
                <h2>Order Total:</h2>
                <h2 style={{color:'orangeRed'}}>{cartTotal.total}</h2>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <div className={`addAddress ${addAddress?'':'hide'}` }>
        <div className='header'>
          <h3>Enter a new delivery address</h3>
          <button onClick={()=>setAddAddress(false)} style={{fontSize:'3vw', margin:'0px', height:'2vw', padding:'0.1vw', cursor:'pointer'}}>*</button>
        </div>

        <form onSubmit={updateAddress}>
          <h1 style={{fontSize:'2.2vw'}}>Add a new address</h1>
          <hr />

          <div style={{display:'flex', flexDirection:'column'}}>
            <label htmlFor="choose_country">Country?Region</label>
            <select onChange={onChangeHandler} id="choose_country" name='country' value={addressData.country} className='secondary_input'>
              <option value="India">India</option>
            </select>
          </div>
          <br />

          {addInputField("Full name (First and Last name)", "text", "Name", "name", `${addressData.name}`)}

          {addInputField("Phone number", "tel", "Phone", "phone", `${addressData.phone}`)}

          {addInputField("Pin code", "Number", "6 digit area code", "pinCode", `${addressData.pinCode}`)}

          {addInputField("Flat, House no, Building, Company, Apartment", "text", '',"building", `${addressData.building}`)}

          {addInputField("Area,Street, Sector, Villate", "text", '',"area", `${addressData.area}`)}

          <div style={{display:'flex', gap:'1vw'}}>
            {addInputField("Town/City", "text", "place", "town", `${addressData.town}`)}
            <div style={{display:'flex', flexDirection:'column'}}>
              <label htmlFor="state">State</label>
              <select name='state' value={addressData.state} onChange={onChangeHandler} className='secondary_input' id="state" placeholder='choose State'>
                <option value="ap" >Andhra Pradesh</option>
              </select>
            </div>
          </div>

          <div>
            <input type="checkbox" id='default_address'/>
            <label htmlFor="default_address">Make this my default address</label>
          </div>

          <br />

          <div>
            <h2>Add delivery instructions(optional)</h2>
            <p>Do we need additional instructions to find this address?</p>
            <textarea rows='5' name="" id="" placeholder='Provide details such as building description ,a nearby landmark'></textarea>
          </div>
          <br />
          <div>
            <h2>Weekened delivery</h2>
            <select  id="weekendDelivery" className='secondary_input'>
              <option value="yes">I can receive shipments any day of the week</option>
              <option value="no">Do not delivery on Weekends</option>
            </select>
          </div>
          <br />
          <button type='submit' className='primary_btn'>Use this address</button>
        </form>
      </div>
    </div>
  )
}

export default Checkout