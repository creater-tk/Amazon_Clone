import React, { useEffect, useState } from 'react'
import './ViewProducts.css'
import axios from 'axios'


const ViewProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  const viewProducts = async () =>{
    try {
      const response = await axios.get('http://localhost:3000/viewProducts');
      if(response.data.success){
        setProducts(response.data.data);
      }
    } catch (error) {
      alert(`Unable to fetch data:${error.message}`)
    }
  }

  const deleteProduct = async (_Id) =>{
    try {
      const response = await axios.post('http://localhost:3000/removeProduct', {id:_Id})
      setLoading(true);
      if(response.data.success){
        alert("Product Removed successfully")
      }else{
        alert(response.data.message)
      }
    } catch (error) {
      alert("Something went Wrong Error:"+error.message)
    }

    setLoading(false);

    viewProducts();
  }

  useEffect(()=>{
    viewProducts();
  },[])

  return (
    <div className='viewProducts'>
      <div className='viewProducts_Area'>
        <ul className='products'>
          <li>Product Image</li>
          <li>Name</li>
          <li>Category</li>
          <li>Description</li>
          <li>Old_Price</li>
          <li>Offer_Price</li>
          <li>Rating</li>
          <li>Remove Product</li>
        </ul>

        {products.length >= 1 ? (
          products.map((eachProduct, index) => {
            const image = `http://localhost:3000/Images/${eachProduct.image}`;
            return (
              <ul key={index} className='product products'>
                <li><img src={image} alt="" /></li>
                <li>{eachProduct.name}</li>
                <li>{eachProduct.category}</li>
                <li>{eachProduct.description}</li>
                <li>{eachProduct.old_price}</li>
                <li>{eachProduct.new_price}</li>
                <li>{eachProduct.rating}</li>
                <li><button onClick={() => deleteProduct(eachProduct._id)}><div className={loading ? 'Loading' : ''}>X</div></button></li>
              </ul>
            );
          })
        ) : (
          <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <p style={{ color: "gray" }}>DataBase was Empty</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewProducts