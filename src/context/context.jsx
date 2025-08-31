import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetAllUsers } from "../redux/AllUsers.js";

const UserProvider = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://chatapp-backend-2-mtha.onrender.com/Allusers")
      .then((resp) => resp.json())
      .then((res) => {
        // console.log(res.users);
        dispatch(SetAllUsers(res.users));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
};

export default UserProvider;
