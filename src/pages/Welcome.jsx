import React, {useState } from 'react'
import { Link } from "react-router-dom";

// components
import AddCategory from '../components/AddCategory';

// Images
import box1 from "../assets/img/elem/box1.png"
import welcomeImg from "../assets/img/welcome2.png"
import elem1 from "../assets/img/welcome/elem1.png"
import { components } from 'react-select';

export default function welcome() {
  let [isCatOpen, setCatIsOpen] = useState(false)


  const items = [
    {
        title : 'Dashboard',
        icon : '',
        url : '/dashboard',
        action : false
    },
    {
        title : 'Add Inventory',
        icon : '',
        url : '/add-inventory',
        action : false
    },
     {
        title : 'Add Category',
        icon : '',
        url : '/all-products',
        action : true
    },
    {
        title : 'All Products',
        icon : '',
        url : '/all-products',
        action : false
    },
   
    
  ]

  return (
    <div className='flex justify-center items-center flex-col min-h-dvh relative overflow-hidden' >
      <img src={box1} loading='lazy' className='absolute -top-5 -left-12  opacity-10 w-[20%] shaking'  />
      <img src={elem1} loading='lazy' className='absolute bottom-0 right-0 w-[10%] funny-cartoon'  />
        <div className='flex items-center gap-5'>
          <h1 className='text-7xl font-semibold text-white font-oswald! mb-10' > <span className='text-primary! font-oswald!'>Welome </span> Please <Link to="/signup" className='cursor-pointer'  >log in.</Link> </h1>
        <img src={welcomeImg} loading='lazy' className='w-25 mb-10 welcome-shaking'  />
        </div>
        <AddCategory isOpen={isCatOpen} setIsOpen={setCatIsOpen} />
        <ul className='grid grid-cols-2 xl:w-2xl gap-6 font-meri'>
            {
                items.map((item,index)=>(
                  (
                    item.action == true ? (
                        <li key={index} className='w-full' >
                     <div onClick={()=> setCatIsOpen(!isCatOpen)} className="w-full block text-white border cursor-pointer border-gray-700 rounded-lg px-4 py-3 relative overflow-hidden before:content-[''] before:bg-gray-800 before:inset-0 before:absolute before:w-0 hover:before:w-full before:transition-all before:duration-200 ">
                        <span className='relative z-1 text-base'>{item.title}</span>
                    </div>
                   </li>)
                   : (
                      <li key={index} className='w-full' >
                     <Link to={item.url} className="w-full block text-white border cursor-pointer border-gray-700 rounded-lg px-4 py-3 relative overflow-hidden before:content-[''] before:bg-gray-800 before:inset-0 before:absolute before:w-0 hover:before:w-full before:transition-all before:duration-200 ">
                        <span className='relative z-1 text-base'>{item.title}</span>
                    </Link>
                   </li>
                   )
                  )
                ))
            }
        </ul>
    </div>
  )
}
