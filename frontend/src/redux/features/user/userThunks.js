import axios from "axios";
import { userActions } from "./userSlice"; // Import action creators
import { server } from "../../../static/data";

export const registerUser =
  (full_name, email, birth_date, password, re_password) => async (dispatch) => {
    try {
      dispatch(userActions.RegisterUserRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const is_Admin = false;
      const body = JSON.stringify({
        full_name,
        email,
        is_Admin,
        birth_date,
        password,
        re_password,
      });
      console.log(body);
      await axios.post(`${server}/auth/users/`, body, config);
      dispatch(userActions.RegisterUserSuccess());
    } catch (error) {
      dispatch(userActions.RegisterUserFail(error.message));
    }
  };

export const activateUser = (uid, token) => async (dispatch) => {
  try {
    dispatch(userActions.ActivateUserRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token });

    await axios.post(`${server}/auth/users/activation/`, body, config);
    dispatch(userActions.ActivateUserSuccess());
  } catch (error) {
    dispatch(userActions.ActivateUserFail(error.message));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(userActions.LoginUserRequest()); // Dispatch the request action
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${server}/auth/jwt/create/`,
      { email, password },
      config
    );
    dispatch(userActions.LoginUserSuccess());
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    dispatch(loadUser());
  } catch (error) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    dispatch(userActions.LoginUserFailure(error.message));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(userActions.LoadUserRequest());
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const { data } = await axios.get(`${server}/auth/users/me/`, config);
      dispatch(userActions.LoadUserSuccess(data));
    } else {
      dispatch(userActions.LoadUserFail("Something went wrong!"));
    }
  } catch (error) {
    dispatch(userActions.LoadUserFail(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(userActions.LogoutUserRequest());
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    dispatch(userActions.LogoutUserSuccess());
    window.location.reload();
  } catch (error) {
    dispatch(userActions.LogoutUserFail(error.message));
  }
};

export const passwordReset = (email) => async (dispatch) => {
  try {
    dispatch(userActions.PasswordResetRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email });
    await axios.post(`${server}/auth/users/reset_password/`, body, config);
    dispatch(userActions.PasswordResetSuccess());
  } catch (error) {
    dispatch(userActions.PasswordResetFail(error.message));
  }
};

export const passwordResetConfirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    try {
      dispatch(userActions.PasswordResetConfirmRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password,
      });
      await axios.post(
        `${server}/auth/users/reset_password_confirm/`,
        body,
        config
      );
      dispatch(userActions.PasswordResetConfirmSuccess());
    } catch (error) {
      dispatch(userActions.PasswordResetConfirmFail(error.message));
    }
  };

export const updateUser =
  (email, full_name, birth_date) => async (dispatch) => {
    try {
      dispatch(userActions.UpdateUserRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };
      const body = JSON.stringify({ email, full_name, birth_date });
      await axios
        .put(`${server}/api/profile/update/`, body, config)
        .then((res) => {
          dispatch(userActions.UpdateUserSuccess());
          dispatch(loadUser());
        });
    } catch (error) {
      dispatch(userActions.UpdateUserFail(error.message));
    }
  };

export const adminGetUsers = () => async (dispatch) => {
  try {
    dispatch(userActions.GetUsersRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const { data } = await axios.get(`${server}/api/admin/users/`, config);
    dispatch(userActions.GetUsersSuccess());
    return data;
  } catch (error) {
    dispatch(userActions.GetUsersFail(error.message));
  }
};
