import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import user_profile from "../assets/user_profile.png";
import { useSelector } from "react-redux";
import store from "../redux/store";
import UserProvider from "../context/context";

const ChatApp = ({ onlineusers }) => {
  UserProvider();
  const { user: userdata } = useSelector((store) => store.auth);
  const { AllUsers: users } = useSelector((store) => store.AllUsers);
  // console.log("Online Users:", users);

  return (
    <div className="flex justify-center items-center h-screen px-2">
      <div className="border-2 rounded-2xl border-gray-600 h-[90vh] w-full max-w-md p-4 shadow-lg bg-gray-500">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-purple-300 via-pink-600 to-red-400 bg-clip-text text-transparent">
            FriendZone
          </h1>

          <Link to="/profile">
            <img
              className="h-[50px] w-[50px] rounded-full mb-3"
              src={userdata?.Profile || user_profile}
              alt="img"
            />
          </Link>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="border border-white w-full p-2 rounded-2xl mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-white"
        />
        <div className="flex flex-col gap-2 overflow-y-auto h-[75vh]">
          {users?.length > 0 ? (
            users.map(
              (user, index) =>
                userdata?._id !== user?._id && (
                  <Link
                    state={{ user, onlineusers }}
                    key={index}
                    to="/message"
                    className="flex items-center font-semibold p-2 border border-white text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    <img
                      src={user.Profile || user_profile}
                      className="h-[50px] w-[50px] rounded-full object-cover"
                      alt="profile"
                    />
                    <div className="flex flex-col">
                      <span className="ml-4 text-lg">{user.FullName}</span>
                      <span
                        className={`ms-4 ${
                          onlineusers?.includes(user._id)
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {onlineusers?.includes(user._id) ? "online" : "offline"}
                      </span>
                    </div>
                  </Link>
                )
            )
          ) : (
            <h1 className="text-center text-gray-500">Users not found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
