import axios from "axios";
import { AsyncStorage } from "react-native";
// import Constants from "expo-constants";
import { API_KEY } from "react-native-dotenv";

//console.log(API_KEY);
const instance = axios.create({
  baseURL: API_KEY
});

instance.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
