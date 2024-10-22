import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../StoreContext/StoreContext.jsx';
import { Link } from 'react-router-dom';

const Cart = () => {

  const { cartData, Backend_url, fecthAllProducts, allProducts, updateCart, setNoOfCartItems } = useContext(StoreContext);

  const [cartItems, setCartItems] = useState([]);
  const [showContainer, setShowContainer] = useState(false);
  const [cartTotal, setCartTotal] = useState({ quantity: 0, total: 0 });


  const findProduct = () => {
    if (cartData.length > 0 && allProducts.length > 0) {
      let totalQuantity = 0;
      let totalPrice = 0;
      const items = cartData.map(eachCartItem => {
        const product = allProducts.find(eachProduct => eachCartItem.productId === eachProduct._id);
        if (product) {
          totalQuantity += eachCartItem.quantity;
          totalPrice += product.new_price * eachCartItem.quantity;
          return {
            ...product,
            quantity:eachCartItem.quantity
          }
        }
        return null;
      }).filter(item => item !== null);

      setCartItems(items);
      setCartTotal({ quantity: totalQuantity, total: totalPrice });
      setShowContainer(items.length > 0);
      setNoOfCartItems(totalQuantity)
    }
  };

  useEffect(() => {
    fecthAllProducts();
  }, []);

  useEffect(() => {
    findProduct();
  }, [cartData, allProducts]);

  return (
    <div className='cart'>
      <div style={{ backgroundColor: 'whitesmoke', borderRadius: '0.5vw', padding: '1vw' }}>
        <h2>Shopping Cart</h2>
        <p>Deselect all items</p>

        <div>
          {cartItems.length > 0
            ? cartItems.map((eachItem, index) => (
              <div key={index}>
                <div className='product_info' style={{ display: 'flex', gap: '2vw', marginTop: '1vw', backgroundColor: 'whitesmoke' }}>
                  <div>
                    <img src={`${Backend_url}/Images/${eachItem.image}`} alt="" style={{ width: '16vw' }} id='order_item' />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6vw' }}>
                    <div>
                      <h2 style={{ width: '65%', fontWeight: '540' }}>{eachItem.description}</h2>
                      <p><b>INR {eachItem.new_price}</b></p>
                      <p>Quantity:{eachItem.quantity}</p>
                    </div>
                    <p>In Stock</p>
                    <div>
                      <input type="checkbox" id='gift_box' style={{width:'2vw'}} />
                      <label htmlFor="gift_box">This is a gift <span>Learn more</span></label>
                    </div>
                    <p><b>Style: </b></p>
                    <div style={{ display: 'flex', gap: '1vw' }}>
                      <button onClick={()=>{updateCart(eachItem._id, "Delete")}} style={{ cursor: 'pointer' }}>Delete</button>
                      <p>Save for later</p>
                      <p>Compare with similar items</p>
                      <p>Share</p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))
            : <div><h2>Your cart is empty!</h2></div>
          }
        </div>
      </div>

      {showContainer &&
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3vw', backgroundColor: 'whitesmoke', padding: '1vw', borderRadius: '0.5vw', height: "fit-content" }}>
          <h2 style={{ fontWeight: '540' }}>Subtotal ({cartTotal.quantity} item{cartTotal.quantity > 1 ? 's' : ''}): <b>INR {cartTotal.total}</b></h2>
          <div>
            <input style={{width:'2vw'}} type="checkbox" id='giftBox' />
            <label htmlFor="giftBox">This order contains a gift</label>
          </div>
          <Link to='/checkout'>
            <button style={{ padding: '1vw', border: 'none', borderRadius: '2vw', backgroundColor: 'orange', cursor: 'pointer' }}>Proceed to checkout</button>
          </Link>

        </div>
      }
    </div>
  );
};

export default Cart;
