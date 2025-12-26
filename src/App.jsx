import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Welcome from '../src/pages/Welcome'
import AddInventory from '../src/pages/AddInventory'
import Dashboard from '../src/pages/Dashboard'
import SignUp from '../src/pages/auth/SignUp'
import food from "./assets/img/food.webp"
import Products from '../src/pages/Products'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
 

    // const [items , setItems] = useState(()=>{
      //   const storesItems =  localStorage.getItem('items');
      //   return storesItems ? JSON.parse(storesItems) : [];
      // });
      const [items , setItems] = useState([])

  return (
    <div className='bg-gray-900 min-h-dvh  ' >
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>} ></Route>
          <Route path="/" element={<Welcome/>} ></Route>
          <Route path="/welcome" element={<Welcome/>} ></Route>
          <Route path="/add-inventory" element={<AddInventory setItems={setItems} items={items} />} ></Route>
          <Route path="/all-products" element={<Products items={items} />} ></Route>
          <Route path="/dashboard" element={<Dashboard items={items} />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
