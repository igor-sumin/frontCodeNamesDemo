import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.common["token"] = localStorage.getItem("token");
axios.defaults.headers.common["ref"] = localStorage.getItem("ref");