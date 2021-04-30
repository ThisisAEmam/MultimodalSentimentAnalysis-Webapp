import { createSlice } from "@reduxjs/toolkit";
import { JWTCookie } from "../app/cookie";

let initialState = { status: false, token: "" };
const jwt = new JWTCookie();
if (jwt.get()) {
  initialState = { status: true, token: jwt.get() };
}

export const LoggedinSlice = createSlice({
  name: "Logged in",
  initialState: initialState,
  reducers: {
    setLoggedin: (state, action) => (state = action.payload),
  },
});

export const { setLoggedin } = LoggedinSlice.actions;

export default LoggedinSlice.reducer;
