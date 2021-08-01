import axios from "axios"
import router from "./router";

axios.defaults.baseURL = "http://localhost:8085/";
axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
axios.defaults.headers.common["roomRef"] = sessionStorage.getItem("roomRef");

function setRoomRef() {
  const path = ["login", "room"];
  const ref_path = window.location.pathname.split("/").pop();

  if (!path.includes(ref_path)) {
    sessionStorage.setItem("roomRef", ref_path);
  }
}

axios.interceptors.response.use(response => {
  return response;
}, error => {
  setRoomRef();
  if (error.response.status === 401) {
    router.push("/login");
  }

  throw error;
});