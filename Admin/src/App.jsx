import React from 'react'
import {Routes, Route} from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import AddProduct from './Pages/AddProduct/AddProduct'
import ViewProducts from './Pages/ViewProducts/ViewProducts'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/addProduct' element={<AddProduct/>}/>
        <Route path='/viewProducts' element={<ViewProducts/>} />
      </Routes>
    </div>
  )
}

export default App