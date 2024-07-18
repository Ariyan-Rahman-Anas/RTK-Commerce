import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./api/productsApi";
import notificationReducer from "./../features/notifications/notificationSlice";
import userProductsReducer from "./../features/userProducts/userProductsSlice";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    notifications: notificationReducer,
    userProductsReducer: userProductsReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(authApi.middleware),
});
setupListeners(store.dispatch);
