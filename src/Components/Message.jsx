import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import back_button from "../assets/back button.png";
import { formatMessageTime } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/ChatSlice";
import RTM from "../context/RTM";
import { toast } from "sonner";
const Message = () => {
  RTM();
  const { user: userdata } = useSelector((store) => store.auth);
  const { setMessages: messages } = useSelector((store) => store.chat);
  const { OnlineUsers: onlineusers } = useSelector((store) => store.online);
  const dispatch = useDispatch();
  const senderId = userdata?._id;
  const location = useLocation();
  const reciever = location.state || {};
  const recieverId = reciever?.user?._id;
  const messagesEndRef = useRef(null);

  const [msg, setmsg] = useState({
    messages: "",
  });

  const handlechange = (e) => {
    setmsg({ ...msg, [e.target.name]: e.target.value });
  };

  const sendMessage = async () => {
    if (!msg.messages.trim()) return;
    try {
      const resp = await fetch("http://localhost:5001/sendmessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg, senderId, recieverId }),
      });
      const res = await resp.json();
      dispatch(setMessages([...messages, res.newMessage]));
      setmsg({ messages: "" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!senderId || !recieverId) return;
    fetch("http://localhost:5001/getMessages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId, recieverId }),
    })
      .then((resp) => resp.json())
      .then((res) => {
        dispatch(setMessages(res.messages));
      })
      .catch((e) => {
        toast.error(e);
      });
  }, [senderId, recieverId]);

  useEffect(() => {
    // this is for the scroll the screen
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex justify-center items-center h-screen px-2">
      <div className="flex flex-col border-2 border-gray-400 rounded-2xl w-full max-w-md h-[90vh] bg-gray-400 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b bg-gray-500 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="flex">
              <Link to="/">
                <img className="h-5 w-5 mt-3 me-3" src={back_button} />
              </Link>
              <img
                src={reciever?.user?.Profile}
                className=" w-[50px] h-[50px] rounded-full flex items-center justify-center"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold  text-lg text-white">
                {reciever?.user?.FullName}
              </span>
              <span
                className={` ms-4 ${
                  onlineusers?.includes(reciever?.user._id)
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {onlineusers?.includes(reciever?.user._id)
                  ? "online"
                  : "offline"}
              </span>
            </div>
          </div>
          <div>
            <span className="text-gray-600 text-2xl">:</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2">
          {messages?.length > 0 ? (
            messages.map((m, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  m.senderId === userdata?._id ? "justify-end" : "justify-start"
                }`}
              >
                <span className="text-lg bg-black text-white shadow px-3 py-2 rounded-2xl max-w-[70%]">
                  {m?.Message || m.message}
                  <span className="text-sm text-gray-400 m-1 p-1">
                    {formatMessageTime(m?.createdAt)}
                  </span>
                </span>
              </div>
            ))
          ) : (
            <h1 className="text-gray-500 text-center mt-5">
              Start chatting...
            </h1>
          )}
          {/* // this is for the scroll the screen */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-2 border-t bg-gray-300 rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              name="messages"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              onChange={handlechange}
              value={msg.messages}
              placeholder="Message"
              className="flex-1 border border-white text-sm rounded-2xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-black"
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
