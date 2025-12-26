import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components
import Donut from '../components/Donust'
import { allItems } from "../store/productsSlice";

export default function Dashboard() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(allItems());
  },[dispatch])
 
  const listItems = useSelector((state) => state.products.list);
  console.log(listItems)



  const getCategoryCount = (category) => {
    return listItems.filter(
      (item) => item.categories.toLowerCase() === category.toLowerCase()
    ).length;
  };


  const cards = [
    { count: getCategoryCount("total"), title: "Total" },
    { count: getCategoryCount("foods"), title: "Foods" },
    { count: getCategoryCount("sports"), title: "Sports" },
    { count: getCategoryCount("education"), title: "Education" },
    { count: getCategoryCount("electronics"), title: "Electronics" },
  ];
  return (
    <div className="max-w-[90%] mx-auto pt-15">
      <div className="flex items-center justify-between gap-5 mb-5">
        <h2 className="text-2xl font-semibold  text-white">Dashboard</h2>
        <Link to="/" className="btn-primary">
          Back  
        </Link>
      </div>
      <ul className="grid grid-cols-5 gap-10 border-b border-gray-800 pb-8">
        {cards.map((card, index) => (
          <li
            key={index}
            className="border border-gray-600 gap-1 w-full rounded-md flex flex-col items-center p-4 pb-3.5"
          >
            <span className="font-bold">{card.title}</span>
            <span>{card.count}</span>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-12 pt-6 ">
        <div className="col-span-7">
          <h2 className="text-2xl font-semibold mb-5 text-white">
            All Products
          </h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 border-b border-gray-700 text-sm py-3 bg-gray-800 px-6">
                  Name
                </th>
                <th className="text-left p-2 border-b border-gray-700 text-sm py-3 bg-gray-800 px-6">
                  Category
                </th>
                <th className="text-left p-2 border-b border-gray-700 text-sm py-3 bg-gray-800 px-6">
                  Price
                </th>
                <th className="text-left p-2 border-b border-gray-700 text-sm py-3 bg-gray-800 px-6">
                  Quantity
                </th>
                <th className="text-left p-2 border-b border-gray-700 text-sm py-3 bg-gray-800 px-6">
                  Vendor Name
                </th>
              </tr>
            </thead>
            <tbody>
              {listItems.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border-b border-gray-800 text-sm py-5 px-5">
                    {item.productName ? item.productName : "No Name"}
                  </td>
                  <td className="p-2 border-b border-gray-800 text-sm py-5 px-5">
                    {item.categories ? item.categories : "No Category"}
                  </td>
                  <td className="p-2 border-b border-gray-800 text-sm py-5 px-5">
                    {item.productPrice ? `$${item.productPrice}` : "$0"}
                  </td>
                  <td className="p-2 border-b border-gray-800 text-sm py-5 px-5">
                    {item.quantity ? item.quantity : "0"}
                  </td>
                  <td className="p-2 border-b border-gray-800 text-sm py-5 px-5">
                    {item.vendorName ? item.vendorName : "No Vendor"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-span-5 border-l border-gray-800 pl-10 ml-10">
          <h2 className="text-2xl font-semibold mb-5 text-white">
            Products Progress
            {/* <Donut items={items} /> */}
          </h2>
        </div>
      </div>
    </div>
  );
}
