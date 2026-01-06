import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/userService";
import { useAuth } from "../../AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Loader from "../../components/Loader";

// components
import AddCategory from "../../components/AddCategory";

// Images
import box1 from "../../assets/img/elem/box1.png";
import elem1 from "../../assets/img/welcome/elem1.png";

// icons
import { FaRegEyeSlash } from "react-icons/fa";
import { frameData } from "motion";

export default function SignUp() {
  const navigate = useNavigate();

  const { signup } = useAuth();
  let [loading, setLoading] = useState(false);
  let [isCatOpen, setCatIsOpen] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
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
    setError((prev) => ({ ...prev, [name]: false }));
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleform = async (e) => {
    // Req Fields
    const newErrors = {};
    for (let key in formData) {
      if (!formData[key]) {
        newErrors[key] = true;
      }
    }
    const objectLength = Object.keys(newErrors).length;
    console.log(objectLength)
    if(objectLength >= 1){
      setError(newErrors);
       setLoading(false);
       return;
    }

    // Check Password Match
    if (formData.password.trim() !== formData.confirm_password.trim()) {
      setError((prev) => ({ ...prev, password_not_match: true }));
      setLoading(false);
      if (error.password_not_match) {
        toast.error("Password not match");
        setLoading(false);
      }
    }

    try {
      setLoading(true);
      const response = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      // console.log("this response"+response)
      // return;
      if (response.data.user && !response.data.session) {
        toast.success("Account created! Please Login");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      console.error("Registration error:", err);
    }

    e.preventDefault();
    setFormData({
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
        <h1 className="text-6xl font-semibold text-white font-oswald! mb-10">
          {" "}
          <span className="text-primary! font-oswald!">Sign </span>in
        </h1>
        {/* <img
          src={welcomeImg}
          loading="lazy"
          className="w-25 mb-10 welcome-shaking"
        /> */}
      </div>
      <AddCategory isOpen={isCatOpen} setIsOpen={setCatIsOpen} />
      <div className="sign-up-form">
        <form className="flex flex-col gap-4 bg-background p-6 rounded-md w-100">
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              onChange={handelChange}
              value={formData.email}
              className={`border border-transparent ${
                error.email ? "border-red-400!" : ""
              }`}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="relative">
              <input
                name="password"
                onChange={handelChange}
                value={formData.password}
                type={`${show.password ? "text" : "password"}`}
                className={`border border-transparent ${
                  error.password ? "border-red-400!" : ""
                }`}
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
                className={`border border-transparent ${
                  error.confirm_password ? "border-red-400!" : ""
                }`}
              />
              <span
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                onClick={() => togglePassword("confirm_password")}
              >
                <FaRegEyeSlash />
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleform}
            className="btn-primary py-1.5! capitalize! flex justify-center items-center gap-3"
          >
            {loading && <Loader />}
            Sign up
          </button>
          <Link to="/login" className="font-light text-xs text-center">
            Already have an account? <span className="font-medium">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
