import React, { useContext, useEffect } from 'react'
import './HomePage.css'
import {assets} from '../../assets/assets.js'
import { StoreContext } from '../../StoreContext/StoreContext.jsx'

const HomePage = () => {
  const {setLoginStatus} = useContext(StoreContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        setLoginStatus(user.isLogin)
    }
  })

  return (
    <div className='home_page' id='top'>
      <div className="categories_field">
        
        <div className='menu_field'>
          <img src={assets.menu_icon} alt='' />
          <p>All</p>
        </div>

        <div className="container dropdown">
          <p>Fresh</p>
          <img src={assets.dropdown_icon} alt="" />
        </div>

        <p>MX Player</p>
        <p>Best Seller</p>
        <p>Today's Deals</p>
        <p>Mobile</p>

        <div className="container dropdown">
          <p>Prime</p>
          <img src={assets.dropdown_icon} alt="" />
        </div>

        <p>Customer Service</p>
        <p>Electronics</p>
        <p>Home & Kitchen</p>
        <p>Fashion</p>
        <p>New Release</p>
      </div>

      <div className='enterance_page'>

        <div className='banner_field'>
          <img src={assets.banner} alt="" />
        </div>

        <div className='arrow_field'>
          <img src="" alt="" />
          <img src="" alt="" />
        </div>

        <div className='box_field banner_cards'>

        <div className='box'>
          <h2>Up to 80% off | Electronics & accessories</h2>
          <img src={assets.box1_4} alt="" />
        </div>

          <div className='box'>
            <h2>Up to 75% off | Never before offers on appliances</h2>
            <img src={assets.box3_3} alt="" />
          </div>

          <div className='box'>
            <h2>Up to 75% off | Never before offers on appliances</h2>
            <img src={assets.box3_2} alt="" />
          </div>

          <div className='box'>
            <h2>Up to 75% off | Never before offers on appliances</h2>
            <img src={assets.box3_4} alt="" />
          </div>
        </div>

        <div className='box_field '>
          <div className='box'>
            <h2>Up to 80% off | Electronics & accessories</h2>
            <img src={assets.box2_4} alt="" />
          </div>

          <div className='box'>
            <h2>Up to 75% off | Never before offers on appliances</h2>
            <img src={assets.box2_3} alt="" />
          </div>

          <div className='box'>
            <h2>Up to 75% off | Never before offers on appliances</h2>
            <img src={assets.box2_2} alt="" />
          </div>

          <div className='box'>
            <h2>Up to 75% off | Never before offers on appliances</h2>
            <img src={assets.box2_1} alt="" />
          </div>
        </div>


    {/**Blockbuster deals */}

        <div className='deals_container'>
          <h3>Blockbuster deals</h3>

          <div className='deals_box_products'>

            <div className='product_box'>
              <img className='product_img' src={assets.product1_3}alt="" />
              <div>
                <p><sup>₹</sup><b>99,598</b><sup>00</sup> <span>M.R.P: <span className='old_price'>₹1,22,366</span></span></p>
                <p>Good Vision Pro with AI integration</p>
              </div>
            </div>

            <div className='product_box'>
              <img className='product_img' src={assets.product1_7}alt="" />
              <div>
                <p><sup>₹</sup><b>99</b><sup>00</sup> <span>M.R.P: <span className='old_price'>₹130</span></span></p>
                <p>Warmers for you shoes for better comfort</p>
              </div>
            </div>

            <div className='product_box'>
              <img className='product_img' src={assets.product1_1}alt="" />
              <div>
                <p><sup>₹</sup><b>199</b><sup>00</sup> <span>M.R.P: <span className='old_price'>₹299</span></span></p>
                <p>Warmers for you shoes for better comfort saver pack</p>
              </div>
            </div>

            <div className='product_box'>
              <img className='product_img' src={assets.product1_4}alt="" />
              <div>
                <p><sup>₹</sup><b>999</b><sup>00</sup> <span>M.R.P: <span className='old_price'>₹1220</span></span></p>
                <p>Good Vision Pro with AI integration</p>
              </div>
            </div>

            <div className='product_box'>
              <img className='product_img' src={assets.product1_2}alt="" />
              <div>
                <p><sup>₹</sup><b>533</b><sup>00</sup> <span>M.R.P: <span className='old_price'>₹999</span></span></p>
                <p>Rubber 10LB home workout dumbles </p>
              </div>
            </div>

            <div className='product_box'>
              <img className='product_img' src={assets.product1_6}alt="" />
              <div>
                <p><sup>₹</sup><b>699</b><sup>00</sup> <span>M.R.P: <span className='old_price'>₹1199</span></span></p>
                <p>outdoor master Half face helmate</p>
              </div>
            </div>

          </div>
        </div>



        <div className='box_field '>
          <div className='box'>
            <h2>Up to 80% off | Electronics & accessories</h2>
            <img src={assets.box2_4} alt="" />
          </div>

          <div className='box'>
            <h2>Up to 75% off | Never before offers on appliances</h2>
            <img src={assets.box2_3} alt="" />
          </div>

          <div className='box'>
            <h2>Up to 75% off | Never before offers on appliances</h2>
            <img src={assets.box2_2} alt="" />
          </div>

          <div className='box'>
            <h2>Up to 75% off | Never before offers on appliances</h2>
            <img src={assets.box2_1} alt="" />
          </div>
        </div>



        {/**Deal in top Categories */}
        <div className='top_deals'>
          <div>
            <img src={assets.top_deals} alt="" />
          </div>
          <div>
            <img src={assets.top_deals_1} alt="" />
          </div>
          <div>
            <img src={assets.top_deals_2} alt="" />
          </div>
          <div>
            <img src={assets.top_deals_4} alt="" />
          </div>          
          <div>
            <img src={assets.top_deals_5} alt="" />
          </div>
          <div>
            <img src={assets.top_deals_1} alt="" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomePage