// import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./slice/authSlice";
// import userReducer from "./slice/userSlice";

// import { combineReducers } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   user: userReducer,
// });

// export const makeStore = (preloadedState?: { auth: { token: string | null } }) =>
//   configureStore({
//     reducer: rootReducer,
//     preloadedState,
//   });

// export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
// export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";
import userReducer from "./slice/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export const makeStore = (preloadedState?: {
  auth?: { token: string | null };
  user?: { id: string | null; email: string | null; royalId: string | null };
}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
