import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import StoreContextProvider from './StoreContext/StoreContext.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <StrictMode>
        <App/>
        <ToastContainer/>
      </StrictMode>
    </StoreContextProvider>
  </BrowserRouter>
)
