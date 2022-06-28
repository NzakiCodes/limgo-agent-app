import axios from "axios";
import authHeader from "./auth-header";
import { API_SERVER as API_URL } from "../config/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const getAuthUser = async () => {
  const res = await axios.get(`${API_URL}/auth`, { headers: authHeader });
  return res.data;
};

const verifyPhoneq = async (code) => {
  // const user_id = await SecureStore.getItemAsync("user_id");
  // console.log(user_id);
  const access_code = code.toString();
  // const data = {
  //     code:"3751",
  //     user_id:"8c526a92-cc66-4120-9b01-67937e6dbe8b"
  // }
  // const updata = JSON.stringify(data);
  // console.log(code);
  const fro = {
    code: "3751",
    user_id: "8c526a92-cc66-4120-9b01-67937e6dbe8b",
  };
  const data = JSON.stringify(fro);
  // const
  const response = await axios.post(`${API_URL}/auth/verify-phone`, data, {
    headers: authHeader,
  });
  console.log(response);
  // return response.data;
};

const verifyPhone = async (code, token, user_id) => {
  const data = {
    code,
    user_id,
  };
  var config = {
    method: "post",
    url: `${API_URL}/auth/login`,
    headers: authHeader,
    data: data,
  };

  try {
    const response = await axios(config);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
async function updateDutyStatus({ availability }) {
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("availability", availability);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  // console.log();

  try {
    const res = await fetch(
      `${API_URL}/rider/${userJSON.data.user.id}/availability`,
      requestOptions
    );
    // const resData = await res.json();
    return res;
  } catch (error) {
    return error;
  }
}

const updateUser = async (data) => {
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;


  var formdata = new FormData();

  formdata.append("user_id", data.user_id);
  formdata.append("first_name", data.first_name);
  formdata.append("last_name", data.last_name);
  // console.log(formdata)

  var requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
    redirect: "follow",
  };
  // console.log(requestOptions);

  try {
    const res = await fetch(`${API_URL}/account/update-user`, requestOptions);
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Change password
const changePassword = async (
  old_password,
  password,
  password_confirmation
) => {
  var formdata = new FormData();
  formdata.append("old_password", old_password);
  formdata.append("password", password);
  formdata.append("password_confirmation", password_confirmation);
  // console.log(formdata)
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  // console.log(requestOptions);

  try {
    const res = await fetch(`${API_URL}/auth/change-password`, requestOptions);
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

async function logout() {
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const res = await fetch(`${API_URL}/auth/logout`, requestOptions);
    return res;
  } catch (error) {
    return error;
  }
}

async function listRiderTaskTypes() {
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const res = await fetch(`${API_URL}/rider/tasks/`, requestOptions);
    return res;
  } catch (error) {
    return error;
  }
}

async function getSingleTask(id) {
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const res = await fetch(`${API_URL}/tasks/${id}`, requestOptions);
    // console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}

async function acceptTask({ shipment_id, task_id }) {
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("shipment_id", shipment_id);
  //   formdata.append("task_id", task_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      `${API_URL}/rider/tasks/accept/${task_id}`,
      requestOptions
    );
    return res;
  } catch (error) {
    return error;
  }
}
async function startPickup({ task_id, code }) {
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("code", code);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      `${API_URL}/rider/tasks/update/${task_id}`,
      requestOptions
    );
    return res;
  } catch (error) {
    return error;
  }
}

async function updateTaskProgress( task_id, code ) {
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("code", code);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      `${API_URL}/rider/tasks/update/${task_id}`,
      requestOptions
    );
    return res;
  } catch (error) {
    return error;
  }
}

async function getTaskDetails({ task_id }) {
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const res = await fetch(`${API_URL}/tasks/${task_id}`, requestOptions);
    return res;
  } catch (error) {
    return error;
  }
}

async function endPickup({ task_id }) {
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("code", "delivery_confirmed");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      `${API_URL}/rider/tasks/update/${task_id}`,
      requestOptions
    );
    return res;
  } catch (error) {
    return error;
  }
}

async function declineTask({ task_id, note }) {
  const user = await AsyncStorage.getItem("user");
  const userJSON = JSON.parse(user);
  const token = userJSON.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("note", note);
  //   formdata.append("task_id", task_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      `${API_URL}/rider/tasks/accept/${task_id}`,
      requestOptions
    );
    return res;
  } catch (error) {
    return error;
  }
}

const userService = {
  getAuthUser,
  changePassword,
  updateUser,
  verifyPhone,
  logout,
  updateDutyStatus,
  listRiderTaskTypes,
  acceptTask,
  declineTask,
  getSingleTask,
  startPickup,
  endPickup,
  updateTaskProgress,
};

export default userService;
