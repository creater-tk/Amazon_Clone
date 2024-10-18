import React, { useContext } from 'react'
import './Product.css'
import {assets} from '../../assets/assets.js'
import { StoreContext } from '../../StoreContext/StoreContext.jsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Products = () => {

  const {productPreview, Backend_url, addToCart} = useContext(StoreContext);
  const navigate = useNavigate();

  if(Object.keys(productPreview).length <1){
    toast.error("Network Issue")
    navigate('/')
  }


  return (
    <div className='product_details'>
      <div className='complete_product_details'>
        <div className='product_preview'>
          <div>
            <ul style={{display:'flex', gap:'1vw'}}>
              <li>Image</li>
              <li>Image</li>
              <li>Image</li>
              <li>Image</li>
              <li>Image</li>
              <li>Image</li>
            </ul>
          </div>
          {/**Break */}
          <div className='large_image'>
            <img src={`${Backend_url}/Images/${productPreview.image}`} alt="" />
          </div>
        </div>
        {/**Break */}

        <div className='about_product'>
          <h2 >{productPreview.name} {productPreview.description}</h2>
          <p style={{color:'purple'}}>Visit the Skytexh Gaming Store</p>
          <div>
            <img style={{width:'7vw'}} src={assets.rating_img} alt="" />
          </div>
          <p style={{fontSize:'3vw'}}><sup>INR</sup>{productPreview.price}<sup>00</sup></p>

          <p style={{color:'gray'}}>INR {productPreview.old_price+productPreview.old_price/8} Shipping & Import Fee Deposit to India <span style={{color:'purple'}}>Details</span></p>

          <p style={{color:'gray'}}>Style:<span style={{fontWeight:'bold', color:"black"}}></span></p>

          <div style={{display:'grid', gap:"3%",gridTemplateColumns:'1fr 1fr 1fr '}}>
            <div style={{border: '1px solid gray', padding:"2%"}}>
              <p>5500|3050(6gb)<br/><span style={{color:'gray'}}>INR {productPreview.price}</span></p>
            </div>
          </div>

          <table>
            <tr>
              <th>Brand</th>
              <td>Skytech Gamming</td>
            </tr>
            <tr>
              <th>Operating System</th>
              <td>Windows 11 Home</td>
            </tr>
            <tr>
              <th>CPU Model</th>
              <td>Core i5</td>
            </tr>
            <tr>
              <th>CPU Speed</th>
              <td>2.5 GHz</td>
            </tr>
            <tr>
              <th>Graphics Card <br />Description</th>
              <td>Dedicated</td>
            </tr>
            <tr>
              <th>Graphics Coprrocessor</th>
              <td>4030</td>
            </tr>
            
          </table>

          <div>
            <h2>About this item</h2>
            <ul className='product_description'>
              <li>INTEL Core i5 13400F 2.5GHz (4.6GHz Max Boost) CPU Processor | 1TB NVME SSD – Up to 30x Faster Than Traditional HDD</li>
              <li>NVIDIA Geforce RTX 4060 8GB GDDR6X Graphics Card (Brand may vary) | 16GB DDR4 RAM 3200 Gaming Memory with Heat Spreader | Windows 11 Home 64-bit</li>
              <li>802.11 AC | No Bloatware | Graphic output options include 1 x HDMI, and 1 x Display Port Guaranteed, Additional Ports may vary | USB Ports Including 2.0, 3.0, and 3.2 Gen1 Ports | HD Audio and Mic | Free Gaming Keyboard and Mouse</li>
              <li>4 RGB Fans for Maximum Air Flow | Skytech Nebula Black Edition with Front Mesh | 1 Year Warranty on Parts and Labor | Lifetime Free Technical Support | Assembled in the USA</li>
              <li>This powerful gaming PC is capable of running all your favorite games such as Call of Duty Warzone, Fortnite, Escape from Tarkov, Grand Theft Auto V, Valorant, World of Warcraft, League of Legends, Apex Legends, Roblox, PLAYERUNKNOWN's Battlegrounds, Overwatch 2, Counter-Strike 2, Battlefield V, New World, Minecraft, Elden Ring, Rocket League, Baldur's Gate 3, Dota 2, HELLDIVERS 2, Monster Hunter, Palworld, Terraria, Rainbow Six Siege, Dragon's Dogma 2, and more at Ultra settings, detailed 1080p Full HD resolution, and smooth 60 plus FPS gameplay.</li>
            </ul>
          </div>
        </div>

        {/**Break */}

        <div className='buy_product'>
          <p style={{fontSize:'3vw'}}><sup>INR</sup>{productPreview.price}<sup>00</sup></p>
          <p style={{color:'gray'}}>INR <span>{productPreview.old_price+productPreview.old_price/8} Shipping & Import Fee Deposit to India <span>Details</span></span></p>
          <p>INR {productPreview.old_price+productPreview.old_price/8} delivery</p>
          <div className='location container font_size'>
            <img src={assets.location_icon} alt="" style={{backgroundColor:'gray', backgroundClip:'image'}}/>
            <p>Update location</p>
          </div>
          <p>In Stock</p>
          <div style={{display:'flex', width:'100%', border:'1px solid gray', padding:'2%', borderRadius:'10px'}}>
            <p>Quantity:</p>
            <select  id="" style={{border:'none', fontSize:'1vw'}}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <button style={{backgroundColor:'rgb(227, 184, 29)'}} >Add to Cart</button>
          <button style={{backgroundColor:'orange'}} onClick={()=>(addToCart(productPreview.id, productPreview.name, eachProduct.new_price))} >Buy Now</button>
          <table>
            <tr>
              <td style={{color:'gray'}}>Ships from </td>
              <td>Amazon.com</td>
            </tr>
            <tr>
              <td style={{color:'gray'}}>Sold by </td>
              <td>Amazon.com</td>
            </tr>
            <tr>
              <td style={{color:'gray'}}>Returns</td>
              <td>30-dat <br />refuld/replacement</td>
            </tr>
            <tr>
              <td style={{color:'gray'}}>Customer</td>
              <td>Amazon.com</td>
            </tr>
          </table>
          <div style={{display:'flex', gap:'5px'}}>
            <input type="checkbox" />
            <label htmlFor="checkbox">Add a gift recipt for easy returns</label>
          </div>

          <hr />

          <div style={{width:'100%', border:'1px solid gray', padding:'3px', cursor:'pointer'}}>
            <button style={{border:'none', fontSize:'1vw'}}>Add to List</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products