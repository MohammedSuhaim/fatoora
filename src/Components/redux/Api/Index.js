import axios from 'axios';
import { getLocalToken, getHost, getHeaders, getAuthToken } from './Config';

const axiosInstance = axios.create({
    baseURL: getHost(),
    headers: {}
});


axiosInstance.interceptors.request.use(
    async config => {
        const token = getLocalToken();
        const authToken = getAuthToken();
        config.headers = {
            ...getHeaders(config.url),
        };
        if (token != null) {
            config.headers['Authorization'] = authToken;
            // console.log("authToken", authToken) 
        }
        if ( authToken == null) {
            config.headers['auth-token'] = token;
            // console.log("toksffsensdc", token)
        }
        else{
            config.headers['authorization'] = `Bearer `+token;
            // console.log("tokfvsfen", token)
        }
        return config;
    },
    error => {
        if (error.response.status == 403) {
            localStorage.clear()
            window.location.href =  "/";
          }
        return Promise.reject(error);
    }
);





export default axiosInstance;