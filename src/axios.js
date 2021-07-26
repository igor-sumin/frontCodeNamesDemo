import axios from "axios"

axios.defaults.baseURL = "http://localhost:8085/";
axios.defaults.headers.common["token"] = localStorage.getItem("token");
axios.defaults.headers.common["roomRef"] = sessionStorage.getItem("roomRef");