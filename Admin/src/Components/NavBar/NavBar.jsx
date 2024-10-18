import React from 'react'
import './NavBar.css'
import {assets} from '../../assets/assets.js'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='NavBar'>
      <div className='logo'>
        <img src={assets.amazon_logo} alt="" />
      </div>

      <ul className='navigator'>
        <li><Link to='/addProduct'>Add Product</Link></li>
        <li><Link to='/viewProducts'>View Products</Link></li>
        <li>Users Cart</li>
      </ul>

      <div className='login'>
          <img src={assets.profile_image} alt="" />
      </div>
    </div>
  )
}

export default NavBar