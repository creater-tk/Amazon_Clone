import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets.js'

const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <a href="#top">
          <button className='top_btn'>Back to Top</button>
        </a>
        <div className='more_details' style={{margin:'1vw 10vw'}}>
          <ul>
            <li><b style={{fontSize:'1.3vw'}}>Get to Know Us</b></li>
            <li>About Amazon</li>
            <li>Careers</li>
            <li>Amazon Science</li>
          </ul>

          <ul>
            <li><b style={{fontSize:'1.3vw'}}>Connect with Us</b></li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>

          <ul>
            <li><b style={{fontSize:'1.3vw'}}>Make Money with Us</b></li>
            <li>sell on Amazon</li>
            <li>Sell under Amazon Accelerator</li>
            <li>Protect and Ouild Your Brand</li>
            <li>Amazon Global Selling</li>
            <li>Become an Affiliate</li>
            <li>Supply to Amazon</li>
            <li>Fulfilment by amazon</li>
            <li>Advertise Your Products</li>
            <li>Amazon Pay on Merchants</li>
          </ul>

          <ul>
            <li><b style={{fontSize:'1.3vw'}}>Let Us Help You</b></li>
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>Recall and Product Safety Alets</li>
            <li>100% Purchase Protection</li>
            <li>Amazon App Download</li>
            <li>Help</li>
          </ul>
        </div>

        <hr />

        <div>
          <div className='footer_logo'>
            <img src={assets.amazon_logo} alt="" />
          </div>
        </div>

        <hr />

        <div >
          <div className='more_details' style={{padding:'2vw'}}>
            <p><small><b>Amazon Web Services</b><br /><span>Books, arts <br />&collectibles</span></small></p>

            <p><small><b>Amazon Web Services</b><br /><span>Books, arts <br />&collectibles</span></small></p>

            <p><small><b>Amazon Web Services</b><br /><span>Books, arts <br />&collectibles</span></small></p>

            <p><small><b>Amazon Web Services</b><br /><span>Books, arts <br />&collectibles</span></small></p>
          </div>

          <p className='copy_right'>Contitions of Use & Sale   Private Notice  Interest Based Ads <br />1996-2024, Amazon.com, Inc, or it's Affiliate</p>
        </div>
      </div>
    </div>
  )
}

export default Footer