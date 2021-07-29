import axios from "axios"
import router from "./router";

axios.defaults.baseURL = "http://localhost:8085/";
axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
axios.defaults.headers.common["roomRef"] = sessionStorage.getItem("roomRef");

axios.interceptors.response.use(undefined, err => {
    const error = err.response;
    // if error is 401 
    if (error.status===401) {
        router.push("/login");
    }
});
   
