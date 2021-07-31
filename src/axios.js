import axios from "axios"
import router from "./router";

axios.defaults.baseURL = "http://localhost:8085/";
axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
axios.defaults.headers.common["roomRef"] = sessionStorage.getItem("roomRef");

// axios.interceptors.response.use(response => {
//     return response;
// }, error => {
//     if (error.response.status === 401) {
//         router.push("/login");
//     }

//     Promise.reject(error);
// });