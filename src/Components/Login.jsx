import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice.js";
import { toast } from "sonner";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setloader] = useState("Login");
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const handlechange = async (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const Login = async () => {
    setloader("loading......");
    try {
      const res = await fetch(
        "https://chatapp-backend-2-mtha.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const resp = await res.json();
      if (resp.success) {
        dispatch(setAuthUser(resp.newuser));
        localStorage.setItem("token", resp.newuser.token);
        toast.success(resp.message);
        navigate("/");
      }
      toast.error(resp.message);
    } catch (error) {
      toast.error(error);
    } finally {
      setloader("Login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>

        {/* Email */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            value={data.email}
            name="email"
            onChange={handlechange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handlechange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            to="/forget"
            className="text-sm text-blue-500 hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={Login}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          {loader}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
