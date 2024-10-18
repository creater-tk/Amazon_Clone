import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage.jsx'
import Product from './Pages/Product/Product.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import Account from './Pages/Account/Account.jsx'
import Layout from './Layout.jsx'
import Your_Account from './Pages/Your_Account/Your_Account.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Results from './Pages/Results/Results.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout><HomePage /></Layout>} />
        <Route path='/products' element={<Layout><Product /></Layout>} />
        <Route path='/cart' element={<Layout><Cart /></Layout>} />
        <Route path='/account' element={<Layout><Account /></Layout>} />
        <Route path='/your_account' element={<Layout><Your_Account/></Layout>}/>
        <Route path='/dashboard' element={<Layout><Dashboard/></Layout>}/>
        <Route path='/results' element={<Layout><Results/></Layout>}/>
      </Routes>
    </div>
  )
}

export default App