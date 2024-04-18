import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: "",
    email: "",
    fullname: "",
  },
  reducers: {
    loginAction: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
    },
    logoutAction: (state) => {
      state.id = null;
      state.username = "";
      state.email = "";
      state.fullname = "";
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
