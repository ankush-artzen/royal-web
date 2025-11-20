// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getCookie, setCookie, deleteCookie } from "cookies-next";

// interface AuthState {
//   token: string | null;
// }

// const initialState: AuthState = {
//   token: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setToken: (state, action: PayloadAction<string>) => {
//       state.token = action.payload;
//       setCookie("authToken", action.payload, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
//     },
//     removeToken: (state) => {
//       state.token = null;
//       deleteCookie("authToken");
//     },
//     loadTokenFromCookie: (state) => {
//       const cookieToken = getCookie("authToken");
//       if (cookieToken && typeof cookieToken === "string") {
//         state.token = cookieToken;
//       }
//     },
//   },
// });

// export const { setToken, removeToken, loadTokenFromCookie } = authSlice.actions;
// export const authReducer = authSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
