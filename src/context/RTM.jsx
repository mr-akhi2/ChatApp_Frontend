import React, { useEffect } from "react";
import { setMessages } from "../redux/ChatSlice";
import { useDispatch, useSelector } from "react-redux";

const RTM = () => {
  const dispatch = useDispatch();
  const { setMessages: messages } = useSelector((store) => store.chat);
  // console.log(messages);
  const { socket } = useSelector((store) => store.socketio);

  useEffect(() => {
    if (!socket) return;

    console.log("Socket connected:", socket.id);

    socket.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, dispatch]);

  return null;
};

export default RTM;
