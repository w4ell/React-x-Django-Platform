import axios from "axios";
import { adminActions } from "./adminSlice"; // Import action creators
import { server } from "../../../static/data";
export const loginAdmin = (email, password) => async (dispatch) => {
  dispatch(adminActions.LoginAdminRequest()); // Dispatch the request action

  try {
    const response = await axios.post(
      `${server}/admin/admin-login`,
      { email, password },
      { withCredentials: true }
    );
    dispatch(adminActions.LoginAdminSuccess(response.data.admin));
    window.location.reload();
  } catch (error) {
    dispatch(adminActions.LoginAdminFailure(error.message));
  }
};

export const loadAdmin = () => async (dispatch) => {
  try {
    dispatch(adminActions.LoadAdminRequest());
    const { data } = await axios.get(`${server}/admin/getadmin`, {
      withCredentials: true,
    });

    // Dispatch LoadAdminSuccess with the retrieved admin data
    dispatch(adminActions.LoadAdminSuccess(data.admin));
  } catch (error) {
    // Dispatch LoadAdminFail with the error message
    dispatch(adminActions.LoadAdminFail(error.message));
  }
};

export const logoutAdmin = () => async (dispatch) => {
  try {
    dispatch(adminActions.LogoutAdminRequest());
    const response = await axios.get(`${server}/admin/admin-logout`, {
      withCredentials: true,
    });
    dispatch(adminActions.LogoutAdminSuccess(response.data.message));
    window.location.reload();
  } catch (error) {
    dispatch(adminActions.LogoutAdminFail(error.message));
  }
};

export const loadAllUsers = () => async (dispatch) => {
  try {
    dispatch(adminActions.GetAllUsersRequest());
    const response = await axios.get(`${server}/admin/getallusers`, {
      withCredentials: true,
    });
    dispatch(adminActions.GetAllUsersSuccess(response.data));
  } catch (error) {
    dispatch(adminActions.GetAllUsersFail(error.message));
  }
};

export const loadAllDocuments = () => async (dispatch) => {
  try {
    dispatch(adminActions.GetAllDocumentsRequest());
    const response = await axios.get(`${server}/admin/getalldocuments`, {
      withCredentials: true,
    });
    dispatch(adminActions.GetAllDocumentsSuccess(response.data));
  } catch (error) {
    dispatch(adminActions.GetAllDocumentsFail(error.message));
  }
};

export const loadAllPreferences = () => async (dispatch) => {
  try {
    dispatch(adminActions.GetAllPreferencesRequest());
    const response = await axios.get(`${server}/admin/getallpreferences`, {
      withCredentials: true,
    });
    dispatch(adminActions.GetAllPreferencesSuccess(response.data));
  } catch (error) {
    dispatch(adminActions.GetAllPreferencesFail(error.message));
  }
};
