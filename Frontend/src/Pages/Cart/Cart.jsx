import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../StoreContext/StoreContext.jsx'

const Cart = () => {

  const {cartData, Backend_url, fecthAllProducts, allProducts} = useContext(StoreContext);

  const [cartItems, setCartItems] = useState([]);

  const findProduct = () =>{
    if(cartData.length >0 && allProducts.length>0){
        const mapedItems = cartData.map(eachCartItem=>{
          const product = allProducts.find(eachProduct =>(eachCartItem.productId === eachProduct._id))
          if(product){
            return {
              name:product.name,
              description:product.description,
              new_price:product.new_price,
              image:product.image,
              quantity: eachCartItem.quantity
            }
          }
        })
        setCartItems(mapedItems)
    }
  }


  useEffect(()=>{
    fecthAllProducts();
  },[])

  useEffect(()=>{
    findProduct();
  }, [cartData, allProducts])

  return (
    <div className='cart'>
      <div>
        <div style={{backgroundColor:'whitesmoke', borderRadius:'0.5vw', padding:'1vw'}}>
          <h2>Shopping Cart</h2>
          <p>Deselect all items</p>

          <div >
            {cartItems.length>0             
            ?cartItems.map((eachItem, index)=>(
              <div style={{display:'grid', gap:'3vw', gridTemplateColumns:'1fr 0.2fr'}} key={index}>
                <div className='product_info' style={{display:'flex', gap:'2vw', marginTop:'1vw' , backgroundColor:'whitesmoke'}}>
                <div style={{display:'flex', gap:'1%'}}>
                <input type="checkbox" id='checkbox' style={{width:'1.5vw'}}/>
                  <label htmlFor="order_item">
                    <img src={`${Backend_url}/Images/${eachItem.image}`} alt="" style={{width:'16vw'}} id='order_item'/>
                  </label>
                </div>
    
                <div style={{display:'flex', flexDirection:'column', gap:'0.6vw'}}>
                  <div >
                    <h2 style={{width:'65%', fontWeight:'540'}}>{eachItem.description}</h2> 
                    <p><b>INR {eachItem.new_price}</b></p>
                  </div>
                  <p>In Stock</p>
                  <div>
                    <input type="checkbox" id='gift_box' />
                    <label htmlFor="gift_box"> This is a gife <span>Learn more</span></label>
                  </div>
                  <p><b>Style: </b></p>
                  <div style={{display:'flex', gap:'1vw'}}>
                    <button style={{cursor:'pointer'}}>Delete</button>
                    <p>Save for later</p>
                    <p>Compare with similr items</p>
                    <p>Share</p>
                  </div>
                </div>
              </div>

              <div style={{display:'flex', flexDirection:'column', gap:'1.3vw', backgroundColor:'whitesmoke',padding:'1vw', borderRadius:'0.5vw', height:'60%'}}>
                <h2 style={{fontWeight:'540'}}>Subtotal ({eachItem.quantity} item): <b>INR {eachItem.new_price}</b></h2>
                <div>
                  <input type="checkbox" id='giftBox' />
                  <label htmlFor="giftBox">This order contains a gift</label>
                </div>
                <button style={{padding:'1vw', border:'none', borderRadius:'2vw', backgroundColor:'orange', cursor:'pointer'}}>Proceed to checkout</button>
              </div>

              <hr />
            </div>
            ))
            :<div><h2>Your cart was empty!</h2></div>
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart