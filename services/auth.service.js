import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import authHeader from "./auth-header";
import { API_SERVER as API_URL } from "../config/constants";

// Register API
const register_old = async (email, phone_number, password) => {
  const response = await axios.post(
    `${API_URL}/auth/vendor-signup`,
    { email, phone_number, password },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (response.data.token) {
    AsyncStorage.setItem("user", JSON.stringify(response.data));
    SecureStore.setItemAsync("token", response.data.token);
    SecureStore.setItemAsync("user_id", response.data.user.id);
  }
  console.log("Server:" + response);
  return response.data;
};
const register = async ({email, phone_number, password}) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var formdata = new FormData();
  formdata.append("email", email);
  formdata.append("phone_number", phone_number);
  formdata.append("password", password);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  try {
    const req = await fetch(`${API_URL}/auth/vendor-signup`, requestOptions);
    return req;
  } catch (error) {
    return error;
  }
};

const verifyPhone = async ({user_id, code}) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
  
    var formdata = new FormData();
    formdata.append("user_id", user_id);
    formdata.append("code", code);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    try {
      const req = await fetch(`${API_URL}/auth/verify-phone`, requestOptions);
      return req;
    } catch (error) {
      return error;
    }
  };

// Login API
const login = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    { email, password },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (response.data.data.token) {
    AsyncStorage.setItem("user", JSON.stringify(response.data));
    SecureStore.setItemAsync("token", response.data.data.token);
  }
  return response.data;
};

// get Auth User
const getAuthUser = async () => {
  const res = await axios.get(`${API_URL}/auth`, { headers: authHeader });
  // const token = await SecureStore.getItemAsync("token");

  console.log(res);
  return res.data;
};

// Logout user
const logoutUser = async () => {
  await AsyncStorage.removeItem("user");
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("user_id");
  const response = await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    }
  );
  return axios.post(`${API_URL}/auth/logout`);
};

// update user Profile
const updateProfile = async (
  user_id,
  name,
  email,
  phone_number,
  password,
  password_confirmation
) => {
  const response = await axios.post(
    `${API_URL}/auth/update-profile`,
    { user_id, name, email, phone_number, password, password_confirmation },
    {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    }
  );
  return response.data;
};
// Change password
const changePassword = async (
  old_password,
  password,
  password_confirmation
) => {
  const response = await axios.post(
    `${API_URL}/auth/change-password`,
    { old_password, password, password_confirmation },
    {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    }
  );
  return response.data;
};

// Forgot Password
const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_URL}/auth/forgot-password`,
    { email },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const logout = async () => {
  await AsyncStorage.removeItem("user");
  await SecureStore.deleteItemAsync("token");
  return axios.post(`${API_URL}/auth/logout`);
};

// fetch api for Duty Status
const fetchDutyStatus = async (availability, user_id) => {
  const response = await axios.get(
    `${API_URL}/rider/duty`,
    {
      availability,
      user_id,
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    }
  );
  return response.data;
};

const authService = {
  register,
  login,
  getAuthUser,
  logout,
  forgotPassword,
  changePassword,
  fetchDutyStatus,
  verifyPhone
};

export default authService;
