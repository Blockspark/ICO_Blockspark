import axios from "axios";
import  showToast  from "../../helper/Api";
 

console.log("api url",process.env.REACT_APP_API_URL)
let Api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

/*
   * Add a request interceptor
   @param config
  */
Api.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem("token");
        if (token != null)
            config.headers.Authorization = `Bearer `+token;
        return config;
    },
    (error) => {
        return Promise.reject(error.response);
    }
);

/*
 * Add a response interceptor
 */
Api.interceptors.response.use(
    (response) => {
        if (response?.status === 200)
            return response;
    },
    (error) => {
        let currentLocation = window.location.pathname;
        if (error?.response) {
            showToast({ message: error.response.data.message, type: "error" });
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                setTimeout(
                    function() {
                        if (currentLocation !== '/')
                        window.location.href = '/';
                    }
                    .bind(this),
                    1000
                );
                
            }
        }
        return Promise.reject(error.response);
    }
);

export default Api;