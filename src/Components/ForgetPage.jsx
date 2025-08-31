import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ForgetPage = () => {
  const [email, setEmail] = useState("");
  const [loder, setloader] = useState("Send password to your email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloader("sending....");
    try {
      await fetch("http://localhost:5001/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((Resp) => {
          return Resp.json();
        })
        .then((res) => {
          if (res.success) {
            return toast.success(res.messages);
          }
          toast.error(res.message);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      toast.error(error);
    } finally {
      setloader("Send password to your email");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Forgot Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
          >
            {loder}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:underline transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPage;
