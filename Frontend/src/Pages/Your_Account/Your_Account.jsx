import React from 'react'
import './Your_Account.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Your_Account = () => {

  const addSection = (image, title, about)=>(
    <div className='pri_section'>
      <div>
        <img style={{width:'4.5vw'}} src={image} alt="" />
      </div>
      <div>
        <h3 style={{fontWeight:'400', margin:'0.5vw 0vw'}}>{title}</h3>
        <p style={{color:'gray'}}>{about}</p>
      </div>
    </div>
  )

  const addSection_2 = (title, p1, p2, p3, p4, p5) =>(
    <div className='pri_section_2'>
      <h2>{title}</h2>
      <p>{p1}</p>
      <p>{p2}</p>
      <p>{p3}</p>
      <p>{p4}</p>
      <p>{p5}</p>
    </div>
  );

  return (
    <div className='your_account' >
      <h2 style={{fontWeight:'400'}}>Your Account</h2>

      <div className='section_Container'>
        {addSection(assets.parcel_icon, "Your Orders", "Track, return, or buy things again")}

        <Link to='/dashboard'>
        {addSection(assets.lock, "Login & sercurity", "Edit login, name, and mobile number")}
        </Link>

        {addSection(assets.prime, "Login & sercurity", "Edit login, name, and mobile number")}

        {addSection(assets.landMark, "Your Orders", "Track, return, or buy things again")}

        {addSection(assets.primeBusiness, "Your Orders", "Track, return, or buy things again")}

        {addSection(assets.payment, "Your Orders", "Track, return, or buy things again")}

        {addSection(assets.payBalance, "Your Orders", "Track, return, or buy things again")}

        {addSection(assets.support, "Your Orders", "Track, return, or buy things again")}
      </div>

      <hr />

      <div className='section_Container'>
        {addSection_2("Digital content and devices", "Apps and more", "Content Library", "Devices", "Digital gifts you've received")}

        {addSection_2("Email alerts, messages, and ads", "Advertising preferences", "Communication preferences", "SMS alert preferences", "Message Centre", "Alexa shopping notification")}

        {addSection_2("More ways to pay", "Default Purchase Settings", "Amazon Pay", "Coupons")}

        {addSection_2("Ordering and shopping preferences", "Leave packaging feedback", "Lists", "Manage saved IDs", "prifile")}

        {addSection_2("Other accounts", "Account Linking", "Seller account", "Amazon Web Services")}

        {addSection_2("Shopping programs and rentals", "Manage Your Amazon Family", "Subscribe & Save", "Shop the Kids Store by age")}

        {addSection_2("Subscriptions", "Email", "Membreships & Subscriptions")}

        {addSection_2("Manage you data", "Request your data", "Manage apps and services with data access", "Close Your Amazon Account", "Privacy Notice")}

      </div>
    </div>
  )
}

export default Your_Account