import { configureStore } from "@reduxjs/toolkit";
import ScreenReducer from "../features/screenSlice";
import CurrentUserReducer from "../features/currentUserSlice";
import LikedModelsReducer from "../features/likedModelsSlice";
import BookmarkedModelsReducer from "../features/bookmarkedModelsSlice";
import LoggedinReducer from "../features/LoggedinSlice";
import MobileDashNavReducer from "../features/mobileDashNavSlice";

export default configureStore({
  reducer: {
    screen: ScreenReducer,
    currentUser: CurrentUserReducer,
    likedModels: LikedModelsReducer,
    bookmarkedModels: BookmarkedModelsReducer,
    loggedin: LoggedinReducer,
    isMobileDashNavOpen: MobileDashNavReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
