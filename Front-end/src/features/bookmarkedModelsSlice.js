import { createSlice } from "@reduxjs/toolkit";

export const bookmarkedModelsSlice = createSlice({
  name: "bookmarkedModels",
  initialState: [],
  reducers: {
    setBookmarkedModels: (state, action) => (state = action.payload),
  },
});

export const { setBookmarkedModels } = bookmarkedModelsSlice.actions;

export default bookmarkedModelsSlice.reducer;
