// import axios from "./index";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';


const base = "user";

export default class ProfileApi {

  static ViewProfile = async () => {
    const token = await SecureStore.getItemAsync("userToken");
    var config = {
      method: 'get',
      url: 'https://limgo-server.herokuapp.com/api/user/profile',
      headers: {
        'x-access-token': token
      }
    };
    const res = await axios(config);
    return res;
  };
  static EditProfile = async (data) => {
    const token = await SecureStore.getItemAsync("userToken");
    var config = {
      method: 'patch',
      url: 'https://limgo-server.herokuapp.com/api/user/editProfile',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      data
    };
    const res = await axios(config);
    return res;
  };
}