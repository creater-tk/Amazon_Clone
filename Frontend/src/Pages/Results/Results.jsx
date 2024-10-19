import React, { useContext, useEffect, useState } from 'react'
import './Results.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../StoreContext/StoreContext'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'


const Results = () => {

  const {getProduct, Backend_url, addToCart , setProductPreview, loginStatus} = useContext(StoreContext);

  const [price, setPrice] = useState(50);
  const [result, setResult] = useState([]);

  const priceHander = (e)=>{
    setPrice(e.target.value*100)
  }

  const choose = (value, id)=>(
    <div >
      <input style={{cursor:"pointer"}} type="checkbox" id={id}/>
      <label style={{cursor:"pointer", fontSize:'0.9vw'}} htmlFor={id} >{value}</label>
    </div>
  );

  const getResultedProducts = async ()=>{
    try {
      let response;
      
      getProduct === ''? 
        response = await axios.get(`${Backend_url}/viewProducts`):
        response = await axios.post(`${Backend_url}/results`, {name: getProduct});
      

      if(response.data.success){
        setResult(response.data.data);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(`Error:${error.message}`)
    }
  }

  useEffect(()=>{
    getResultedProducts();
  }, [getProduct])



  return (
    <div className='results'>
      <div className='sideBar'>
        <div>
          <h3>Deals & discounts</h3>
          <p>All Discounts</p>
          Todays Deals
        </div>
        <br />
        <div>
          <h3>Price <br />₹<span>0</span> - ₹<span>{price}</span></h3>
          <div>
            <input onChange={priceHander} type="range" id='price_range' min={0} max={100}/>
            <label htmlFor="price_range">Go</label>
          </div>
        </div>
        <br />
        <div>
          <h3>Cycle Wheel Size</h3>
          {choose("12Inch", "12")}
          {choose("14Inch", "14")}
          {choose("16Inch", "16")}
          {choose("18Inch", "18")}
          {choose("2Inch", "21")}
          {choose("22Inch", "22")}
          {choose("24Inch", "24")}
          {choose("26Inch", "26")}
          {choose("28Inch", "28")}
        </div>
        <br />
        <div>
          <h3>Customer Review</h3>
          <img style={{width:'5vw'}} src={assets.rating_img} alt="" />
        </div>
        <br />
        <div>
          <h3>Number of Speeds</h3>
          {choose("1", "1")}
          {choose("2", "2")}
          {choose("3", "3")}
          {choose("4", "4")}
          {choose("5", "5")}
          {choose("6", "6")}
          {choose("7", "7")}
        </div>
        <br />
        <div>
          <h3>Cycle Frame Size</h3>
          {choose("Up to 13 Inches", "13In")}
          {choose("Up to 15Inch", "15In")}
          {choose("Up to 17Inch", "17in")}
          {choose("Up to 19Inch", "19In")}
          {choose("Up to 21Inch", "21In")}
          {choose("Up to 23Inch", "23In")}
        </div>
        <br />
        <div>
          <h3>Department</h3>
          <p>Kids</p><br />
          <p>Mens</p><br />
          <p>Womens</p>
        </div>
        <br />
        <div>
          <h3>Brands</h3>
          {choose("Leader", "Leader")}
          {choose("Avon", "Avon")}
          {choose("Hero", "Hero")}
          {choose("Lifelong", "LifeLong")}
          {choose("Grrkay", "Grekay")}
          {choose("FIREFOX", "Firefox")}
        </div>
      </div>

      <div>
        <h3>Results</h3>
        <p>Check each product page for other buying options, Price and other details may vary based on product size and color</p>
        <div style={{ padding:'1vw 2vw'}}>
          {result.length>=1?
          <div style={{marginTop:'2vw'}}>
            {result.map((eachProduct, index)=>(
              <div style={{display:'grid', gridTemplateColumns:'0.3fr 1fr'}} key={index}>
                <img style={{width:'13vw'}} src={`${Backend_url}/Images/${eachProduct.image}`} alt="" />
                <div style={{display:'flex', flexDirection:'column', gap:'0.5vw'}}>
                  <Link to='/products'>
                    <h3 onClick={()=>setProductPreview({name:eachProduct.name, description:eachProduct.description, price:eachProduct.new_price, old_price:eachProduct.old_price, image:eachProduct.image, id:eachProduct._id})}>{eachProduct.name} {eachProduct.description}</h3>
                  </Link>
                  
                  <img style={{width:'6vw'}} src={assets.rating_img} alt="" />

                  <p style={{color:"gray"}}><sup>₹</sup><span style={{fontSize:'1.5vw', color:'black'}}>{eachProduct.new_price} </span>M.R.P: <span style={{textDecoration:'lineThrough'}}>{eachProduct.old_price}</span>&lb;13% &rb; <br /> Save extra with No Cost EMI</p>

                  <p>FREE devlivery as soon <b>Tue, 5 Nov, 8am -5 pm</b></p>

                  <Link to={loginStatus?'/cart':"/account"}>
                    <button onClick={()=>{
                      loginStatus?(addToCart()):''
                    }} className='primary_btn' style={{width:'8vw'}}>Add to cart</button>
                  </Link>


                </div>
                <hr />
              </div>
            ))}
          </div>:
          <div style={{display:'flex', height:'90vh', alignItems:'center', justifyContent:'center'}}>
            <h1>No Products Found</h1>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Results