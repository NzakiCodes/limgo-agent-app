// import axios from "./index";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';


const base = "user";

export default class ProfileApi {

  static ViewProfile = async () => {
   /*  const token = await SecureStore.getItemAsync("userToken");
    var config = {
      method: 'get',
      url: 'https://limgo-server.herokuapp.com/api/user/profile',
      headers: {
        'x-access-token': token
      }
    }; */
  /*  try {
    // const res = await axios(config);
    if (res.statusCode !== 200) {
      console.log(res);
      SecureStore.deleteItemAsync("userToken");
    }
    // return res;
   } catch (error) {
      console.log("Error Code" +error.errorCode)
   } */
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