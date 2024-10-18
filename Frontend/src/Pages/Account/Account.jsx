import React, { useContext, useEffect, useState } from 'react';
import './Account.css';
import {assets} from '../../assets/assets.js';
import { StoreContext } from '../../StoreContext/StoreContext.jsx';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {

  const {Backend_url,loginStatus, setLoginStatus} = useContext(StoreContext);

  const navigate = useNavigate();


  const [switchAccount, setSwitchAccount] = useState(false);
  const [addAccount, setAddaccount] = useState(false);
  const [haveAccount, sethaveAccount] = useState(false);


  const [processing, setProcessing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  let userName = userEmail.split('@')[0];



  const [register_userDetails, setRegister_userDetails] = useState({
    name:'',
    email:'',
    mobile_number:'',
    password:'',
    re_password:''
  })

  const [login_userDetails, setLogin_userDetails] = useState({
    email:'',
    password:''
  })



  const register_onchange_Handler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setRegister_userDetails(prev =>{
      return {...prev, [name]:value}
    })
  }

  const login_onchange_Handler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setLogin_userDetails(prev=>{
      return {...prev, [name]:value}
    })
  }

  const accoutnLogin = async (e)=>{
    e.preventDefault();
    setProcessing(true);
    try {
      const response = await axios.post(`${Backend_url}/login`,login_userDetails);

      if(response.data.success){
        setLoginStatus(true);
        toast.success("Logined Successfully");
        const userMail = login_userDetails.email;

        localStorage.setItem("user", JSON.stringify({Email: userMail, isLogin:true, _userId:response.data._userId}))
        localStorage.setItem("token", response.data.token);

        setLogin_userDetails({
          email:'',
          password:''
        })

        navigate('/')
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Error: Internal Server Issue')
    }

    setProcessing(false);
  }

  const accountRegistration = async (e) => {

    e.preventDefault();
    setIsRegistered(false);
    setProcessing(true);
  
    const reCheckPassword = register_userDetails.password === register_userDetails.re_password;

    if (!reCheckPassword) {
      setProcessing(false); // Set processing to false when returning early
      return toast.error("Recheck your password.");
    }
  
    try {
      // Create the timeout promise
      const timeOutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Server is taking too long to respond. Please try again later."));
        }, 5000);
      });
  
      // Create the API request promise
      const apiRequest = axios.post(`${Backend_url}/register`, register_userDetails);
  
      // Race between the API request and the timeout
      const response = await Promise.race([apiRequest, timeOutPromise]);
  
      // Handle the response from the API
      if (response.data.success) {
        setProcessing(false);
        toast.success('User registered successfully');
        setRegister_userDetails({
          name: '',
          email: '',
          mobile_number: '',
          password: '',
          re_password: ''
        });
        setIsRegistered(true)
      } else {
        setProcessing(false); 
        toast.error(response.data.message);
      }
    } catch (error) {
      setProcessing(false);
      toast.error(`Error: ${error.message}`);
    }
  };


  useEffect(()=>{
    if(isRegistered){
      sethaveAccount(true)
    }

  }, [isRegistered])

  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setLogin_userDetails(prev=>({
        ...prev, 
        email: user.Email
      }));
      setLoginStatus(user.isLogin);
      setUserEmail(user.Email);
    }
  }, [])


  return (
    <div className='account'>
      <Link to='/'>
       <img style={{width:'10vw'}} src={assets.amazon_logo_dark} alt="" />
      </Link>

      {addAccount?
        <div>
          {!haveAccount? 
            <form onSubmit={accountRegistration} style={{padding:'2vw', width:'23vw', border:'1px solid gray', borderRadius:'1vw', display:'flex', flexDirection:'column',gap:'0.2vw'}}>
              <h2 style={{fontWeight:'400', fontSize:'2vw'}}>Create account</h2>

              <div>
                <label htmlFor="user_name">Your name</label>
                <input onChange={register_onchange_Handler} type="text" id='user_name' required className='primary_input' name='name' value={register_userDetails.name}/>
              </div>

              <div style={{display:'flex', gap:'0.5vw'}}>
                <div>
                  <label htmlFor="user_email">Email</label>
                  <input onChange={register_onchange_Handler} type="email" id='user_email' required className='primary_input' name='email' value={register_userDetails.email}/>
                </div>
                <div>
                  <label htmlFor="mobile_number">Mobile number </label>
                  <input onChange={register_onchange_Handler} type="tel" id='mobile_number' required className='primary_input' name='mobile_number' value={register_userDetails.mobile_number}/>
                </div>
              </div>

              <div>
                <label htmlFor="user_password">Password</label>
                <input onChange={register_onchange_Handler} type="password" id='user_password' required className='primary_input' name='password' value={register_userDetails.password}/>
              </div>

              <div>
                <label htmlFor="user_rePassword">Re-enter password</label>
                <input onChange={register_onchange_Handler} type="password" id='user_rePassword' required className='primary_input' name='re_password' value={register_userDetails.re_password}/>
              </div>

              <button className='primary_btn' disabled={processing}>{!processing?'continue':<div className='loading'></div>}</button>

              <p style={{fontSize:'0.8vw', margin:'0.5vw 0vw'}}>By creating an account, you agree to Amazon's <span style={{color:'blue', textDecoration:'underline'}}>Conditions of Use and Privacy Notice</span></p>

              <hr style={{borderColor:'lightgray'}}/>

              <div style={{margin:'0.5vw 0vw'}}>
                <p><b style={{fontSize:'0.8vw'}}>Buying for work?</b></p>
                <p style={{color:'skyblue', fontSize:'0.8vw'}}>Create a free business account  </p>
              </div>

              <hr style={{borderColor:'lightgray'}} />

              <p>Already have an account? <span style={{cursor:'pointer', color:'skyblue'}} onClick={()=>sethaveAccount(true)}>Sign in</span></p>

            </form>
            :<div>
              <div  style={{padding:'2vw', width:'23vw', border:'1px solid gray', borderRadius:'1vw', display:'flex', flexDirection:'column', gap:'0.8vw'}}>
                <h2 style={{fontWeight:'400', fontSize:'2vw'}}>Sign In</h2>

                <div>
                  <label htmlFor="login">Email or mobile phone number</label>
                  <input onChange={login_onchange_Handler} name='email' value={login_userDetails.email}   type="email" className='primary_input' required/>
                </div>

                <button onClick={()=>setAddaccount(false)} className='primary_btn'>Continue</button>

                <p style={{fontSize:'0.8vw'}}>By continuing, you agree to Amazon's <span style={{color:'blue', textDecoration:'underline'}}>Conditions of Use and Privacy Notice</span></p>

                <p style={{color:'skyblue'}}>Need help?</p>

                <hr />

                <div>
                  <p><b style={{fontSize:'0.8vw'}}>Buying for work?</b></p>
                  <p style={{color:'skyblue', fontSize:'0.8vw'}}>Shop on Amazon Business </p>
                </div>
              </div>

              <div style={{display:'grid', gridTemplateColumns:'1fr 0.9fr 1fr', alignItems:'center', color:'gray', margin:'1vw 0vw'}}>
                <hr style={{height:'0px', borderColor:'lightgray'}}/>
                <p>New to Amazon</p>
                <hr style={{height:'0px', borderColor:'lightgray'}}/>
              </div>

              <button style={{padding:'0.6vw', borderRadius:'1vw', border:"1px solid lightgray", cursor:'pointer', fontSize:'0.8vw', width:'100%'}} onClick={()=>sethaveAccount(false)}>Create you Amazon account</button>
            </div>
          }
        </div>
        :(
          <div style={{padding:'2vw', width:'23vw', border:'1px solid gray', borderRadius:'1vw'}}>

          <h2 style={{fontWeight:'400', fontSize:'2vw'}}>{switchAccount?'Switch accounts':'Sign in'}</h2>
          <hr style={{marginBottom:'1vw'}}/>
  
          {switchAccount?''
            :<p style={{textAlign:'end', color:'purple', cursor:'pointer'}}onClick={()=>setSwitchAccount(!switchAccount)}>Switch account</p>}
            
  
          <div style={{display:'grid', gridTemplateColumns:'0.2fr 1fr', marginBottom:'1vw'}}>
            <img style={{width:'3vw',backgroundColor:'lightgray', borderRadius:'50%', marginRight:'1vw', padding:'0.5vw'}} src={assets.user_icon} alt="" />
            {loginStatus?
              <p>{userName} <br /><span style={{color:'gray'}}>{userEmail}</span></p>
              :<p>Tharun <br /><span style={{color:'gray'}}>tharunkumarboddeti@gmail.com</span></p>
            }
          </div>
  
          {switchAccount?
            <div>
              <hr style={{marginBottom:'1vw', borderColor:'lightgray'}}/>
              <div style={{display:'flex', alignItems:'center', gap:'1vw', cursor:'pointer'}} className='add_account' onClick={()=>{setAddaccount(!addAccount); setSwitchAccount(!switchAccount)}}>
                <div className='add_icon' id='add'>+</div>
                <label className='add_label' htmlFor="add" >Add account </label>
              </div>
            </div>
            : <form id='sign_in' onSubmit={accoutnLogin} style={{display:'flex', flexDirection:'column', gap:'0.8vw'}}>
            <div>
              <div style={{display:'flex', justifyContent
                :'space-between', alignItems:'center'
              }}>
                <label htmlFor="password">Password</label>
                <p style={{color:'skyblue'}}>Forgot password?</p>
              </div>
              <input name='password' value={login_userDetails.password} onChange={login_onchange_Handler} type="password" id='password' className='primary_input' required/>
            </div>
  
  
            <button  type='submit' className='primary_btn' disabled={processing}>{!processing?'Sign In':<div className='loading'></div>}</button>
  
            <div style={{display:'flex', alignItems:'center', gap:'2%'}}>
              <input type="checkbox" id='keepSigned' style={{width:'1.8vw'}} />
              <label htmlFor="keepSigned">Keep me signed in. <span style={{color:'skyblue'}}>Details</span> </label>
            </div>
  
            <div style={{display:'grid', gridTemplateColumns:'1fr 0.1fr 1fr', alignItems:'center', color:'gray'}}>
              <hr style={{height:'0px', borderColor:'lightgray'}}/>
              <p>or</p>
              <hr style={{height:'0px', borderColor:'lightgray'}}/>
            </div>
  
            <button style={{padding:'0.6vw', borderRadius:'1vw', border:"1px solid lightgray", cursor:'pointer'}}>Sign in with code</button>
          </form>}
        </div>
        )
      }

      {switchAccount?<p style={{textAlign:'center'}}><span style={{color:'skyblue', cursor:'pointer'}}>Learn more</span> about switching accounts</p>:''}

      <hr style={{border:'1px solid lightgray', width:'100%'}}/>

      <p style={{color:'blue', fontSize:'0.8vw'}}>Contitions of Use <span style={{margin:'0vw 2vw'}}>Privacy Notice</span> <span>Help</span></p>
      <p style={{color:'gray', fontSize:'0.8vw'}}>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
    </div>
  )
}

export default Account