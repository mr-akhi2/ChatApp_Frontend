import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [loader, setloader] = useState("Signup");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handlechange = async (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const Signup = async () => {
    setloader("loading...");
    try {
      await fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((Resp) => {
          return Resp.json();
        })
        .then((res) => {
          if (res.success) {
            return toast.success(res.message);
          }
          toast.error(res.message);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
    } finally {
      setloader("Signup");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account 🚀
        </h1>
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handlechange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handlechange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
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
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPass"
              value={data.confirmPass}
              onChange={handlechange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={Signup}
            className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition"
          >
            {loader}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
