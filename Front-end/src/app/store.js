import { configureStore } from "@reduxjs/toolkit";
import ScreenReducer from "../features/screenSlice";
import CurrentUserReducer from "../features/currentUserSlice";

export default configureStore({
  reducer: {
    screen: ScreenReducer,
    currentUser: CurrentUserReducer,
  },
});
