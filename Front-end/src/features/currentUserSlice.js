import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { userName: "swilam20", firstName: "Mahmoud", lastName: "Swilam", email: "mahmoud.swilam.2020@gmail.com" },
  reducers: {
    setCurrentUser: (state, action) => (state = action.payload),
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
