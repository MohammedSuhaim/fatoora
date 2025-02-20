import axios from "axios";
import { getLocalToken, getHost, getHeaders, getAuthToken } from "./Config";

const axiosInstance = axios.create({
  baseURL: getHost(),
  headers: {},
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const laung = localStorage.getItem('language');
    console.log(laung, "at config index file");
    const token = getLocalToken();
    const authToken = getAuthToken();

    config.headers = {
      ...getHeaders(config.url),
    };
    if (authToken != null) {
      // config.headers["auth-token"] = authToken;
      config.headers["authorization"] = `Bearer ` + authToken;
    }
    config.headers["Accept-Language"] = laung ?? "en";
    if (token != null) {
      // config.headers["authorization"] = `Bearer ` + token;
      config.headers["auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
