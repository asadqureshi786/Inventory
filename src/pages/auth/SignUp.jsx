import React, { useState } from "react";
import axios from "axios";
// components
import AddCategory from "../../components/AddCategory";

// Images
import box1 from "../../assets/img/elem/box1.png";
import welcomeImg from "../../assets/img/welcome2.png";
import elem1 from "../../assets/img/welcome/elem1.png";
import { components } from "react-select";
// icons
import { FaRegEyeSlash } from "react-icons/fa";

export default function SignUp() {
  let [isCatOpen, setCatIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [show, setShow] = useState({
    password: false,
    confirm_password: false,
  });

  const togglePassword = (key) => {
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const  handleform  =  async(e) => {
    try{
      const response = await axios.post('')
    }catch(err){}



    e.preventDefault();
    console.log(formData);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    });
    localStorage.setItem("user", JSON.stringify(formData));
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-dvh relative overflow-hidden">
      <img
        src={box1}
        loading="lazy"
        className="absolute -top-5 -left-12  opacity-10 w-[20%] shaking"
      />
      <img
        src={elem1}
        loading="lazy"
        className="absolute bottom-0 right-0 w-[10%] funny-cartoon"
      />
      <div className="flex items-center gap-5">
        <h1 className="text-7xl font-semibold text-white font-oswald! mb-10">
          {" "}
          <sspan className="text-primary! font-oswald!">Sign </sspan>in
        </h1>
        {/* <img
          src={welcomeImg}
          loading="lazy"
          className="w-25 mb-10 welcome-shaking"
        /> */}
      </div>
      <AddCategory isOpen={isCatOpen} setIsOpen={setCatIsOpen} />
      <div className="sign-up-form">
        <form className="flex flex-col gap-4 bg-gray-800 p-6 rounded-md w-100">
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              onChange={handelChange}
              value={formData.username}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="" onChange={handelChange} value={formData.email} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="relative">
              <input
                name="password"
                onChange={handelChange}
                value={formData.password}
                type={`${show.password ? "text" : "password"}`}
              />
              <span
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                onClick={() => togglePassword("password")}
              >
                <FaRegEyeSlash />
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="relative">
              <input
                name="confirm_password"
                onChange={handelChange}
                value={formData.confirm_password}
                type={`${show.confirm_password ? "text" : "password"}`}
              />
              <span
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                onClick={() => togglePassword("confirm_password")}
              >
                <FaRegEyeSlash />
              </span>
            </div>
          </div>
          <button type="button" onClick={handleform} className="btn-primary">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
