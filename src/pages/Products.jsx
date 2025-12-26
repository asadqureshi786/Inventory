import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Icons
import { CiBoxList } from "react-icons/ci";
import { SlGrid } from "react-icons/sl";
import { PiCaretDownBold } from "react-icons/pi";
import { allItems } from "../store/productsSlice";
import { BsTrash3 } from "react-icons/bs";


export default function Products() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(allItems());
  },[dispatch])
  
  const items = useSelector((state) => state.products.list);


    

  const notify = () => toast.error("Wow so easy!");
  const [gridView, setGridView] = useState(true);
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [showRemove, setShowRemove] = useState(false)

  const price = items.map((item) => Number(item.productPrice || 0 ));
  const minPrice = price.length ?  Math.min(...price) : 0;
  const maxPrice = price.length ? Math.max(...price) : 0;

  useEffect(()=>{
      setRangeValue(maxPrice)
  },[items])


  

  const [rangeValue, setRangeValue] = useState(maxPrice);

  const filterCards = items.filter((item) => {
    const searchMatch =
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      item.productPrice.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const filterMatch =
      filterValue === "all" ||
      filterValue === "" ||
      item.categories.toLowerCase() === filterValue.toLowerCase();

    const priceMatch = Number(item.productPrice) <= Number(rangeValue);

    return searchMatch && filterMatch && priceMatch;
  });

  const removeItem = (index)=>{
    const getItem = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
    getItem.splice(index,1);
    localStorage.setItem('items',JSON.stringify(getItem));
    dispatch(allItems());
    toast.success("Item Removed Successfully")
    
    
  };


  return (
    <div className="max-w-[90%] mx-auto pt-15">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <Link to="/" className="btn-primary">
            Back
          </Link>
          <Link to="/add-inventory  " className="btn-primary">
            Add Producs
          </Link>
          <button to="/" className="btn-primary bg-red-900! border-red-800!" onClick={()=> setShowRemove(!showRemove)}>
            Remove Product
          </button>
        </div>
        <ToastContainer />
        <div className="flex items-center gap-2">
          <span>${rangeValue}</span>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={rangeValue}
            onChange={(e) => setRangeValue(e.target.value)}
          />
          <div className="relative cursor-pointer">
            <select
              name="filterSelect"
              className="peer w-full cursor-pointer bg-gray-700 py-2 rounded-sm px-3 text-xs text-white outline-0 appearance-none"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              onClick={() => setOpenFilter(!openFilter)}
            >
              <option value="selected" disabled>
                Select Category
              </option>
              <option value="all">All</option>
              <option value="food">Food</option>
              <option value="cloths">Cloths</option>
              <option value="Sports">Sports</option>
              <option value="Eduction">Eduction</option>
              <option value="Electronis">Electronis</option>
            </select>
            <PiCaretDownBold
              className={`absolute top-1/2 -translate-y-1/2 right-2.5    ${
                openFilter ? "rotate-180" : "rotate-0"
              } transition-all`}
            />
          </div>
          <input
            type="text"
            className="bg-gray-700 text-sm rounded-sm py-1.5 px-3 outline-0"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="text-xl flex items-center gap-2">
            <span className="cursor-pointer" onClick={() => setGridView(true)}>
              <SlGrid />
            </span>
            <span
              className="cursor-pointer text-3xl"
              onClick={() => setGridView(false)}
            >
              <CiBoxList />
            </span>
          </div>
        </div>
      </div>

      {gridView ? (
        <ul className="grid grid-cols-4 gap-5 overflow-auto none-track  max-h-[calc(100vh-70px)]">
          {filterCards.map((item, index) => (
            <li key={index} className="item relative">
              {/* <img src={item.productImage} className="w-full h-40 rounded-xl" /> */}
              {item.productImage != 0 ? (
                <img
                  src={item.productImage}
                  className="w-full h-50 rounded-xl bg-start! object-cover border border-gray-700"
                />
              ) : (
                <div>
                  <h2 className="w-full h-50 flex justify-center items-center text-white text-6xl  font-semibold border border-gray-700 rounded-xl">
                    ?
                  </h2>
                </div>
              )}
              <div className="px-1 py-1">
                <div className="flex justify-between items-center mt-2 border-b border-gray-600 pb-2">
                  <p className="text-sm font-semibold">
                    {item.productName ? item.productName : "No Product Name"}
                    {/* {item.categories ? item.categories : "No categories Name"} */}
                  </p>
                  <p className="text-sm font-normal">
                    $ {item.productPrice ? item.productPrice : "0"}
                  </p>
                </div>
                <p className="text-[13px] mt-2">
                  {item.description
                    ? item.description.substr(0, 100)
                    : "No Description"}{" "}
                  ...{" "}
                </p>
              </div>
              <span className="text-[11px] absolute top-3 right-4 bg-gray-700 rounded-sm px-2 py-0.5">
                {item.categories ? item.categories : "No categories Name"}
              </span>
              {
                showRemove && <span className="zero-scale text-[12px] absolute top-3 left-4 bg-red-800 rounded-sm px-1.5 py-1 cursor-pointer" onClick={()=> removeItem(index)} >
                <BsTrash3/>
              </span>
              }
            
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-1 gap-5 overflow-auto none-track  max-h-[calc(100vh-70px)]">
          {filterCards.map((item, index) => (
            <li key={index} className="flex items-start gap-5 relative">
              {/* <img src={item.productImage} className="w-full h-40 rounded-xl" /> */}
              {item.productImage != 0 ? (
                <img
                  src={`${item.productImage}`}
                  className="min-w-50 w-50 h-30 rounded-xl bg-start! object-cover border border-gray-700 "
                />
              ) : (
                <div>
                  <h2 className="min-w-50 w-50 h-30  flex justify-center items-center text-white text-6xl  font-semibold border border-gray-700 rounded-xl">
                    ?
                  </h2>
                </div>
              )}
              <div className="px-1 py-1 w-full">
                <div className="flex justify-between items-center mt-2 border-b border-gray-600 pb-2">
                  <p className="text-base font-semibold">
                    {item.productName ? item.productName : "No Product Name"}
                  </p>
                  <p className="text-base font-normal">
                    $ {item.productPrice ? item.productPrice : "0"}
                  </p>
                </div>
                <p className="text-xs mt-2">
                  {item.description
                    ? item.description.substr(0, 100)
                    : "No Description"}{" "}
                  ...{" "}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
