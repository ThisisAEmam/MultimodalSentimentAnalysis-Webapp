import { createSlice } from "@reduxjs/toolkit";

export const LoggedinSlice = createSlice({
  name: "Logged in",
  initialState: false,
  reducers: {
    setLoggedin: (state, action) => (state = action.payload),
  },
});

export const { setLoggedin } = LoggedinSlice.actions;

export default LoggedinSlice.reducer;
