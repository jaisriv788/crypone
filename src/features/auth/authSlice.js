import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: null,
  baseurl:"https://worldofsoftware.in/rpro"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
