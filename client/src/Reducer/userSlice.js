import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  displayName: "",
  uid: "",
  accessToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state) => {
      //
    },
    clearUser: (state) => {
      state.displayName = "";
      state.uid = "";
      state.accessToken = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
