import { createSlice } from "@reduxjs/toolkit";
const AllUsersSlice = createSlice({
  name: "AllUsers",
  initialState: {
    AllUsers: null,
  },
  reducers: {
    SetAllUsers: (state, action) => {
      state.AllUsers = action.payload;
    },
  },
});
export const { SetAllUsers } = AllUsersSlice.actions;
export default AllUsersSlice.reducer;
