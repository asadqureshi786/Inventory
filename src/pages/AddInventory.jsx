import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Facnybox Links
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useSelector } from "react-redux";


export default function AddInventory({ items, setItems }) {
  let categoriesOptions = localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : [];
  useEffect(() => {
    Fancybox.bind(root, "[data-fancybox='gallery']");
    return () => Fancybox.unbind(root, "[data-fancybox='gallery']");
  }, []);

  const initialState = {
    productImage: "",
    otherImages: [],
    productName: "",
    productPrice: "",
    quantity: "",
    categories: "",
    vendorName: "",
    location: "",
    description: "",
  };
  // return [setRoot];
  const [form, setFrom] = useState({
    id :  Date.now(),
    productImage: "",
    otherImages: [],
    productName: "",
    productPrice: "",
    quantity: "",
    categories: "",
    vendorName: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, multiple } = e.target;
    if (
      type === "text" ||
      type === "number" ||
      type === "textarea" ||
      type === "select-one"
    ) {
      setFrom((prev) => ({ ...prev, [name]: value }));
    } else if (type === "file") {
      if (multiple) {
        const files = Array.from(e.target.files);
        setFrom((prev) => ({
          ...prev,
          [name]: [...prev.otherImages, ...files],
        }));
      } else {
        const soloImg = e.target.files[0];
            const reader = new FileReader();
         reader.onload = () => {
        setFrom(prev => ({ ...prev, [name]: reader.result }));
         };
               reader.readAsDataURL(soloImg);

      }
    }
    e.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // setFrom((prevItems) => [form, ...prevItems]);
    setFrom({
      id : "",
      productImage: "",
      otherImages: [],
      productName: "",
      productPrice: "",
      quantity: "",
      categories: "",
      vendorName: "",
      location: "",
      description: "",
    });
    const getItems = localStorage.getItem('items') 
    const ngetItems = getItems ? JSON.parse(getItems) :[]; 
    ngetItems.push(form);
    localStorage.setItem('items',JSON.stringify(ngetItems));
  };
  return (
    <>
      <div className=" w-[90%]  fixed top-1/2 left-1/2 -translate-1/2">
        <div className="flex items-center justify-between">
          <h2 className="text-start text-white text-3xl uppercase font-semibold mb-5">
            Add Inventory
          </h2>
          <Link to="/all-products" className="text-sm border-b border-white">
            See All Products
          </Link>
        </div>
        <div className="grid grid-cols-12 items-start gap-5">
          <div className="col-span-8">
            <div className="flex gap-5">
              <form
                onSubmit={handleSubmit}
                className="bg-background py-4 px-5 rounded-md "
              >
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6 flex flex-col gap-1">
                    <label className="text-gray-300 text-[15px] font-medium">
                      Product Image
                    </label>
                    <label>
                      <input
                        type="file"
                        className="bg-gray-700 py-2.5 rounded-sm px-4 text-xs text-white outline-0 w-full"
                        onChange={handleChange}
                        name="productImage"
                      />
                    </label>
                  </div>
                  <div className="col-span-6  flex flex-col gap-1">
                    <label className="text-gray-300 text-[15px] font-medium">
                      Other Images
                    </label>
                    <label>
                      <input
                        type="file"
                        multiple
                        className="bg-gray-700 py-2.5 rounded-sm px-4 text-xs text-white outline-0 w-full"
                        name="otherImages"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="col-span-6 group flex flex-col">
                    <label className="text-gray-300 mb-2 text-[15px] font-medium">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="bg-gray-700 py-2.5 rounded-sm px-4 text-xs text-white outline-0"
                      onChange={handleChange}
                      name="productName"
                      value={form.productName}
                    />
                  </div>
                  <div className="col-span-3 group flex flex-col">
                    <label className="text-gray-300 mb-2 text-[15px] font-medium">
                      Product Price
                    </label>
                    <div className="relative w-full">
                      <input
                        type="number"
                        className="w-full bg-gray-700 py-2.5 rounded-sm px-5 text-xs text-white outline-0"
                        onChange={handleChange}
                        name="productPrice"
                        value={form.productPrice}
                      />
                      <span className="absolute top-1/2 left-2 -translate-y-1/2 text-xs text-white">
                        $
                      </span>
                    </div>
                  </div>
                  <div className="col-span-3 group flex flex-col">
                    <label className="text-gray-300 mb-2 text-[15px] font-medium">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="w-full bg-gray-700 py-2.5 rounded-sm px-4 text-xs text-white outline-0"
                      onChange={handleChange}
                      name="quantity"
                      value={form.productPrice}
                    />
                  </div>
                  <div className="col-span-3 group flex flex-col">
                    <label className="text-gray-300 mb-2 text-[15px] font-medium">
                      Categories
                    </label>
                    <select
                      onChange={handleChange}
                      name="categories"
                      className="w-full bg-gray-700 py-2.5 rounded-sm px-3 text-xs text-white outline-0"
                      value={form.categories}
                    >
                      <option value="selected" selected disabled>
                        Select Category
                      </option>
                      {
                        categoriesOptions.map((category, index) => (
                          <option key={index} value={category.value}>{category.label}</option>
                        ))
                      }
                
                    </select>
                  </div>
                  <div className="col-span-4 group flex flex-col">
                    <label className="text-gray-300 mb-2 text-[15px] font-medium">
                      Vendor Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 py-2.5 rounded-sm px-4 text-xs text-white outline-0"
                      onChange={handleChange}
                      name="vendorName"
                      value={form.vendorName}
                    />
                  </div>
                  <div className="col-span-5 group flex flex-col">
                    <label className="text-gray-300 mb-2 text-[15px] font-medium">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 py-2.5 rounded-sm px-4 text-xs text-white outline-0"
                      onChange={handleChange}
                      name="location"
                      value={form.location}
                    />
                  </div>
                  <div className="col-span-12 group flex flex-col">
                    <label className="text-gray-300 mb-2 text-[15px] font-medium">
                      Description
                    </label>
                    <textarea
                      className="w-full bg-gray-700 py-2.5 rounded-sm px-4 text-xs text-white outline-0 resize-none"
                      onChange={handleChange}
                      rows={5}
                      name="description"
                      value={form.description}
                    ></textarea>
                  </div>
                </div>
                <div className="mt-3 flex gap-3 justify-between">
                  <Link to="/" className="btn btn-primary cursor-pointer">
                    Back
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-span-4 flex flex-col  justify-between h-full">
            <div className="item">
              {form.productImage ? (
                <img
                  src={form.productImage}
                  className="w-full h-50 rounded-xl bg-start! object-cover "
                />
              ) : (
                <div>
                  <h2 className="w-full h-50 flex justify-center items-center text-white text-6xl  font-semibold border border-gray-700 rounded-xl">
                    ?
                  </h2>
                </div>
              )}

              <div className="px-3 py-1">
                <div className="flex justify-between items-center mt-2 border-b border-gray-600 pb-2">
                  <p className="text-sm break-words font-semibold">
                    {form.productName ? form.productName : "No Product Name"}
                  </p>
                  <p className="text-sm break-words font-normal">
                    $ {form.productPrice ? form.productPrice : "0"}
                  </p>
                </div>
                <p className="text-[13px] break-words mt-2 ">
                  {" "}
                  {form.description
                    ? form.description.substr(0, 150) + "..."
                    : "No Description"}{" "}
                </p>
              </div>
            </div>
            <div className="border border-gray-700 h-15 rounded-md relative">
              <span
                className="absolute -top-5 text-xs text-red-400! right-0 cursor-pointer"
                onClick={() => setFrom({ ...form, otherImages: [] })}
              >
                Remove All
              </span>
              {form.otherImages.length == 0 ? (
                <div className="flex justify-center items-center h-full text-xs ">
                  No Gallery Images
                </div>
              ) : (
                <ul className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-2 items-center h-full ">
                  {form.otherImages.map((image, index) => (
                    <li>
                      <a
                        data-fancybox="gallery"
                        href={URL.createObjectURL(image)}
                      >
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          className="min-w-12 w-12 h-12 m-1 rounded-md object-cover cursor-pointer"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
