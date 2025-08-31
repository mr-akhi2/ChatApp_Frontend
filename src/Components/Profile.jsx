import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import user_profile from "../assets/user_profile.png";
import { useDispatch, useSelector } from "react-redux";
import { ALLsetOnlineUsers } from "../redux/OnlineUsers";
import { setAuthUser } from "../redux/authSlice";
import { toast } from "sonner";

const Profile = () => {
  const [selected, Setselect] = useState();
  const [Loading, setLoading] = useState("Upload");
  const { user } = useSelector((store) => store.auth);
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const { socket } = useSelector((store) => store.socketio);
  const dispatch = useDispatch();

  const Update = async () => {
    setLoading("updating.....");
    try {
      if (!file) {
        return toast.error("please select image");
      }

      const formdata = new FormData();
      formdata.append("profile", file);

      const resp = await fetch(
        `https://chatapp-backend-2-mtha.onrender.com/profile/${user?._id}`,
        {
          method: "PATCH",
          body: formdata,
        }
      );

      const res = await resp.json();

      if (resp.ok) {
        dispatch(setAuthUser(res.user));
        toast.success(res.message);
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error while uploading profile");
    } finally {
      setLoading("Upload");
    }
  };

  const Logout = async () => {
    await fetch("https://chatapp-backend-2-mtha.onrender.com/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?._id }),
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          localStorage.removeItem("token");
          socket.disconnect();
          dispatch(ALLsetOnlineUsers([]));
          navigate("/login");
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-xl text-gray-700">Loading...</h1>
        <h1 className="text-xl text-gray-700">you need to login first...</h1>
        <Link
          onClick={() => window.localStorage.removeItem("token")}
          to="/login"
        >
          go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen px-2">
      <div className="border-2 rounded-2xl border-gray-600 h-[90vh] w-full max-w-md p-4 shadow-lg bg-gray-500">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Profile
        </h1>

        <div className="mt-20">
          <div className="flex justify-center mt-5 mb-5">
            <label htmlFor="inp">
              <img
                src={selected || user?.Profile || user_profile}
                alt="Profile Avatar"
                className="h-24 w-24 rounded-full object-cover"
              />
            </label>
            <input
              id="inp"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFile(file);
                  const imageUrl = URL.createObjectURL(file);
                  Setselect(imageUrl);
                }
              }}
            />
          </div>

          <h1 className="text-center text-2xl mb-2 font-semibold text-white">
            {user.FullName}
          </h1>
          <h2 className="text-center text-white mb-5 text-lg">{user.email}</h2>

          <div className="flex flex-col w-full">
            <button
              onClick={Update}
              className="p-2 rounded-2xl m-2 bg-green-600 text-white cursor-pointer"
            >
              {Loading}
            </button>
            <button
              onClick={Logout}
              className="p-2 rounded-2xl m-2 bg-blue-600 text-white"
            >
              Log out
            </button>
            <button className="p-2 rounded-2xl m-2 bg-red-600 text-white">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
