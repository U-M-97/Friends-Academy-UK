import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

export default configureStore({
    reducer: {
      user: userReducer,
    },
  });