import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Welcome from '../src/pages/Welcome'
import AddInventory from '../src/pages/AddInventory'
import Dashboard from '../src/pages/Dashboard'
import Login from '../src/pages/auth/Login'
import SignUp from '../src/pages/auth/SignUp'
import food from "./assets/img/food.webp"
import Products from '../src/pages/Products'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
 

  return (
    //     <div className='bg-gradient-to-b 
// from-[#0b132b] 
// via-[#1c2541] 
// to-[#3a506b] min-h-dvh  ' >
    // <div className='bg-gray-900 min-h-dvh  ' >
    <div className='bg-linear-to-b from-[#0B132B] to-[#1C2541] min-h-dvh  ' >

      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>} ></Route>
          <Route path="/Login" element={<Login/>} ></Route>
          <Route path="/" element={<Welcome/>} ></Route>
          <Route path="/welcome" element={<Welcome/>} ></Route>
          <Route path="/add-inventory" element={<AddInventory />} ></Route>
          <Route path="/all-products" element={<Products />} ></Route>
          <Route path="/dashboard" element={<Dashboard  />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
