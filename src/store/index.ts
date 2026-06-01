import { configureStore } from "@reduxjs/toolkit";
import page from "./page";
import user from "./user";

export default configureStore({
  reducer: {
    user: user,
    page: page,
  },
});
