import { createSlice } from "@reduxjs/toolkit";

const OnlineUsers = createSlice({
  name: "online",
  initialState: {
    OnlineUsers: [],
  },
  reducers: {
    ALLsetOnlineUsers: (state, action) => {
      state.OnlineUsers = action.payload;
    },
  },
});

export const { ALLsetOnlineUsers } = OnlineUsers.actions;
export default OnlineUsers.reducer;
