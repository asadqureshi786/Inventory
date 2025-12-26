import React, { useEffect, useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../store/productsSlice";

// Icons
import { IoIosAddCircle } from "react-icons/io";


export default function AddCategory({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  let categories = useSelector((state) => state.products.categories);

  const [allCategories, setAllCategories] = useState(()=> localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : []);


  const [newCategory, setNewCategory] = useState("");
  const options = [
    { value: "category1", label: "category1" },
    { value: "category2", label: "category2" },
  ];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#364153",
      fontSize: "14px",
      borderColor: "transparent",
      border: "0px",
      outline: "0px",
      height: "40px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
      fontSize: "12px",
      backgroundColor: "yellow",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1D2939",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#364153" : "transparent", 
      color: "#fff",
      fontSize: "12px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999",
      fontSize: "13px",
      padding: "0px 6px",
    }),
     multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#1D2939", 
       color: "#fff",
       borderRadius : "4px",
    }),
      multiValueLabel: (provided) => ({
      ...provided,
      color: "white", 
      fontSize : "12px",
    }),
  };


  const addMore = (e,text) => {
    if(e.key === "Enter" || text === "click") {
      if(e.target.value.trim() === '') return;
      dispatch(addCategory({ value: newCategory, label: newCategory },));
      setNewCategory('');
      setAllCategories(localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : []);
    }    
  }
     useEffect(()=>{
      console.log(categories)
    },[categories])
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50  "
          >
            <div className="fixed   inset-0  flex w-screen items-center justify-center p-4 backdrop-blur-sm bg-black/5 ">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className=""
              >
                <div className="max-w-xl w-2xl space-y-4 border border-gray-700 rounded-md bg-gray-800  py-5 ">
                  <DialogTitle className="font-bold text-xl border-b border-gray-700 pb-4 px-7">
                    Add New Category
                  </DialogTitle>

                  <div className="px-7 space-y-4">
                 <div className="relative" >  
                     <input
                      type="text"
                      className="bg-gray-700 py-2.5 rounded-sm px-4 text-xs text-white outline-0 w-full"
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Add New Product"
                      value={newCategory}
                      name="productImage"
                      multiple
                      onKeyDown={(event)=>  addMore(event,'')}
                    
                    />
                    <button onClick={(event)=> addMore(event,'click')} type="button" className="absolute top-1/2 -translate-y-1/2 right-3 text-xl cursor-pointer" ><IoIosAddCircle/></button>
                 </div>

                    <Select options={allCategories} isMulti styles={customStyles} />

                    <div className="flex gap-4 justify-end mt-5">
                      <button
                        className="btn-danger"
                        onClick={() => setIsOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        className="btn-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
