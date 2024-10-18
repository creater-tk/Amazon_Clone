import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../StoreContext/StoreContext'
import {useNavigate} from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate();

  const {Backend_url} = useContext(StoreContext);
  const [userDetails, setUserDetails] = useState({})

  const detailsField = (title, name, button)=>(
    <div style={{display:'flex', justifyContent:'space-between',gap:'1vw', padding:'1vw 1.5vw'}}>
      <div>
        <p><span style={{fontWeight:'bold', fontSize:'95%'}}>{title}</span> <br /> <span style={{fontSize:'80%'}}>{name}</span></p>
      </div>
      <button style={{width:'10vw', padding:'0.6vw', border:'1px solid gray', borderRadius:'3vw', fontSize:'80%', cursor:'pointer'}}>{button} </button>
    </div>
  )

  const getUserDetails = async ()=>{
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user._userId;
      console.log(userId)

      const token = localStorage.getItem("token");
      
      const config = {
        headers:{
          token: `${token}`,
          'Content-Type':'application/json'
        }
      }

      const response = await  axios.post(`${Backend_url}/userDetails`, {_id: userId}, config);
      if(response.data.success){
        return setUserDetails(response.data.data);
      }else{
        return alert(response.data.message);
      }
    } catch (error) {
      navigate('/dashboard')
      return toast.error(`Error:${error.message}`)
    }
  }

  useEffect(()=>{
    getUserDetails();
  }, []);

  return (
    <div className='dashboard'>
      <h2>Login and Sercurity</h2>
      <div className='detailsField'>
        {detailsField('Name', userDetails.name, "Edit" )}
        <hr />
        {detailsField('Email', userDetails.email, "Edit" )}
        <hr />
        {detailsField('Primary mobile number', userDetails.mobile_number, "Edit" )}
        <hr />
        {detailsField('Passkey', "Set passkey", "continue" )}
        <hr />
        {detailsField('Password', "********", "Edit" )}
        <hr />
        {detailsField('2-setp verification', "Not Seted", "Manage" )}
        <hr />
        {detailsField('Compromised account?', "Take steps like changing your password and signing out everywhere", "Start" )}
      </div>
    </div>
  )
}

export default Dashboard