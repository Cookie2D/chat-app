import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import chatSlice from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
