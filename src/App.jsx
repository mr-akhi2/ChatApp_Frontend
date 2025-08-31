import React, { useContext, useEffect, useState } from "react";
import ChatApp from "./Components/ChatApp";
import { Route, Routes } from "react-router-dom";
import Message from "./Components/Message";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";
import ForgetPage from "./Components/ForgetPage";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socketSlice";
import { ALLsetOnlineUsers } from "./redux/OnlineUsers";

const App = () => {
  const { user: userdata } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [onlineusers, setOnlineUsers] = useState([]);
  useEffect(() => {
    if (userdata) {
      const socketio = io("https://chatapp-backend-2-mtha.onrender.com", {
        query: {
          userId: userdata?._id,
        },
        transports: ["websocket"],
      });
      dispatch(setSocket(socketio));

      // console.log(socketio);
      socketio.on("getOnlineUsers", (onlineUser) => {
        setOnlineUsers(onlineUser);
        dispatch(ALLsetOnlineUsers(onlineUser));
        // console.log(onlineUser);
      });
      return () => {
        socketio.close();
      };
    }
  }, [userdata]);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<ForgetPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ChatApp onlineusers={onlineusers} />} />
          <Route path="/message" element={<Message />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
