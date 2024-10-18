import React, { useContext, useEffect, useState } from 'react'
import './NavBar.css'
import {assets} from '../../assets/assets.js'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext} from '../../StoreContext/StoreContext.jsx'

const NavBar = () => {

  const {setGetProduct} = useContext(StoreContext);

  const user = JSON.parse(localStorage.getItem("user"))
  let loginStatus = false
  if(user){
    loginStatus = user.isLogin;
  }else{
    loginStatus = false;
  }

  const [userName, setUserName] = useState('')
  const navigate = useNavigate();

  const [showContainer, setShowContainer] = useState(false)


  const hoverHandler = ()=>{
    setShowContainer(true)
  }
  const hoverOutHandler = ()=>{
    setShowContainer(false)
  }

  const signOutHandler = ()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setShowContainer(false);
    navigate('/')
  }

  const searchHandler = (e)=>{
    if(e.key === 'Enter'){
      navigate('/results')
    }
  }

  const onChangeHandler = (e)=>{
    setGetProduct(e.target.value)
  }

  useEffect(()=>{
    const User = JSON.parse(localStorage.getItem('user'));
    if(User){
      const userEmail = User.Email;
      setUserName(userEmail.split('@')[0]);
    }
  },[])

  return (
    <div>
      <div className='nav-bar'>
        <Link to='/'>
          <div className='logo'>
            <img src={assets.amazon_logo} alt="" />
          </div>
        </Link>

        <div className='location container font_size'>
          <img src={assets.location_icon} alt="" />
          <p>Update location</p>
        </div>

        <div className='input_field font_size'>

          <div className='input_field drop_down' style={{width:'100%'}}>

            <select style={{padding:'0.3vw'}} id='category_selector'>
              <option value="All Category">All Category</option>
              <option value="Amazon Devices">Amazon Devices</option>
              <option value="Amazon Pharmacy">Amazon Pharmacy</option>
              <option value="Amazon Fashion">Amazon Fashion</option>
              <option value="Appliances">Appliances</option>
            </select>
            <label htmlFor="category_selector" >
              <img src={assets.dropdown_icon} alt="" />
            </label>

          </div>

          <input onChange={onChangeHandler} type="text" placeholder='Search Amazon.in' style={{width:'100%'}} onKeyDown={searchHandler}/>

          <div className='search_icon' style={{width:'100%'}}>
            <Link to='/results'>
              <img src={assets.search_icon} alt="" />
            </Link>           
          </div>
        </div>

        <div className='container language_field font_size'>
          <img src={assets.us_flag} alt="" />
          <p>En</p>
        </div>

        <Link to={loginStatus?'/your_account':'/account'}>
          <div className='font_size user_account' onMouseEnter={hoverHandler}>
            <p>Hello, {loginStatus?userName:'Sign In'} <br /><b style={{fontSize:'1vw'}}>Account & Lists</b></p>
          </div>
        </Link>

        <div className='font_size'>
          <p>Returns <br /><b  style={{fontSize:'1vw'}}>& Orders</b></p>
        </div>

        <Link to='/cart'>
          <div className='container cart_field font_size'>
            <img src={assets.cart_icon} alt="" />
            <p>Cart</p>
          </div>
        </Link>
      </div>

      {showContainer?
        <div className='hided_Container'  onMouseLeave={hoverOutHandler}>
          <div className='hided_header'>
            <p>Who is shopping? Select a profile</p>
            <p style={{color:'aqua', cursor:'pointer'}}>Manage Profile &gt; </p>
          </div>

          <div className='hided_Container_Inner'>
            <div>
              <h3>Your Lists</h3>

              <p>Alexa Shopping List <br /> <span style={{color:'gray'}}>0 items</span></p>
              <hr />
              <p>Shopping List</p>
              <hr />

              <p>Create a wish List</p>
              <p>Wish from Any Website</p>
              <p>Bany Wishlist</p>
              <p>Discover Your Style</p>
              <p>Explore Showroom</p>
            </div>

            <div>
              <h3>Your Account</h3>
              <p>Switch Account</p>
              <p><small onClick={signOutHandler}>Sign Out</small></p>

              <hr />

              <p>Your Account</p>
              <p>Your Orders</p>
              <p>Your Wish List</p>
              <p>Keep Shopping for <br /> Your Recommendations</p>
              <p><>Recall and Product Safety Alerts</></p>
              <p><>Your Prime Membership</></p>
              <p><>Your Prime Video</></p>
              <p><>Your Subscribe & Save Items</></p>
              <p><>Memberships & Subscriptons</></p>
            </div>
          </div>
        </div>:''}

    </div>
  )
}

export default NavBar