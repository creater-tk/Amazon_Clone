import React from 'react'
import './AddProduct.css'
import {assets} from '../../assets/assets.js'
import axios from 'axios'
import { useState } from 'react'

const AddProduct = () => {

  const [loading, setLoading] = useState(false)

  const [productDetails, setProductDetails] = useState({
    name:'',
    description:'',
    category:"Electronics",
    old_price:'',
    new_price:'',
    brand:'',
    image:null
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    if(name === 'image'){
      const image = e.target.files[0]
      setProductDetails(data =>({...data, [name]:image}))
    }else{
      setProductDetails(data => ({...data, [name]:value}))
    }
  }

  const addContainer = ( id, type, holderName, name, value, label_name)=>(
    <div className='field'>
      <label htmlFor={id}>{label_name}</label>
      <input type={type} required placeholder={holderName} name={name} value={value} onChange={onChangeHandler} id={id}/>
    </div>
  )

  const addProduct = async (e)=>{
    try {
      e.preventDefault();
      setLoading(true)

      const formData = new FormData();
      for(let key in productDetails){
        formData.append(key, productDetails[key])
      };

      const response = await axios.post('http://localhost:3000/addProduct', formData);

      setLoading(false);

      if(response.data.success){
        alert('Product Added Successfully')
      }
      setProductDetails({
        name:'',
        description:'',
        old_price:'',
        new_price:'',
        brand:'',
        image:null
      })

    } catch (error) {
      setLoading(false)
      alert(`Try After SomeTime Error: ${error.message}`)
    }
  }

  return (
    <div className='addProduct'>
      <form className='addProduct_area' onSubmit={addProduct}>

        {addContainer("product_name", "text", "Name", "name", productDetails.name, "Product Name")}

        {addContainer("product_brand", "text", "Brand", "brand", productDetails.brand, "Brand")}

        <div className='field'>
          <label htmlFor="description">Description</label>
          <textarea  id="description" required placeholder='Description' value={productDetails.description} onChange={onChangeHandler}name='description'></textarea>
        </div>

        <div className='field'>
          <label htmlFor="category">Category:</label>
          <select  id="category" name='category' value={productDetails.category} onChange={onChangeHandler}>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Footware">Footware</option>
          </select>
        </div>

        <div className='price_field'>
          {addContainer("old_price", "Number", "Price", "old_price", productDetails.old_price, "Old Price")}
          {addContainer("new_price", "Number", "Price", "new_price", productDetails.new_price, "New Price")}
        </div>

        <div className='field'>
          <label>Upload Image:</label>
          <label  htmlFor="upload_image">
            <img src={
                  productDetails.image === null?assets.upload_area:
                  URL.createObjectURL(productDetails.image)} 
            alt=""/>
          </label>
          <input type="file" hidden id='upload_image' required name='image'  onChange={onChangeHandler}/>
        </div>

        <button type='submit' className='add_btn'><div className={loading?`${'Loading'}`:''}>Add Product</div></button>
      </form>
    </div>
  )
}

export default AddProduct