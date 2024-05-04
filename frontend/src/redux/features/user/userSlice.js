import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  isAdminAuthenticated: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoginUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    LoginUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    LoginUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    LoadUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    LoadUserSuccess: (state, action) => {
      if (action.payload.is_admin) {
        state.isAdminAuthenticated = true;
      } else {
        state.isAuthenticated = true;
      }
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.isAdminAuthenticated = false;
      state.currentUser = null;
      state.error = action.payload;
    },
    LogoutUserRequest: (state) => {
      state.loading = true;
    },
    LogoutUserSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.isAdminAuthenticated = false;
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    LogoutUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    PasswordResetRequest: (state) => {
      state.error = null;

      state.loading = true;
    },
    PasswordResetSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    PasswordResetFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    PasswordResetConfirmRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    PasswordResetConfirmSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    PasswordResetConfirmFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    RegisterUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    RegisterUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    RegisterUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ActivateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    ActivateUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    ActivateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    UpdateUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    UpdateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
