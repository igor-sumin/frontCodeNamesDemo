import axios from "axios";
import router from "./router";
import "./axios";

// --- Entry ---

async function authenticate(form) {
  try {
    const response = await axios.post("login", form);
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common["token"] = localStorage.getItem("token");

    router.push("/room");
  } catch (e) {
    return e.response.data;
  }
}

async function registration(form) {
  try {
    const response = await axios.post("register", form);
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common["token"] = localStorage.getItem("token");

    router.push("/login");
  } catch (e) {
    return e.response.data;
  }
}

// TODO: доделать
async function recover(email) {
  const response = await axios.post("forgot", email);
  console.log(response.data);
}

// --- Params ---

async function createRoom() {
  try {
    const response = await axios.post("room", {});
    sessionStorage.setItem("roomRef", response.data.roomRef);
    axios.defaults.headers.common["roomRef"] = sessionStorage.getItem("roomRef");

    router.push("/role");
  } catch (e) {
    return e.response.data;
  }
}

async function takeRandRoom() {
  try {
    const response = await axios.get("room/random");
    sessionStorage.setItem("roomRef", response.data.roomRef);
    axios.defaults.headers.common["roomRef"] = sessionStorage.getItem("roomRef");

    router.push("/role");
  } catch (e) {
    return e.response.data;
  }
}

async function takeAmountUsersRoom() {
  const response = await axios.get("room/qnt");
  return response.data;
}

// --- Roles ---

async function defRoleTeam(json) {
  try {
    json.roomRef = sessionStorage.getItem("roomRef");
    const response = await axios.post("user", json);

    router.push({
      name: "dashboard",
      query: {
        r: json.roomRef
      }
    });

  } catch (e) {
    return e.response.data;
  }
}

// --- Dashboard ---

function logout() {
  localStorage.removeItem("token");
  router.push("/login");
}

async function getUserInfo() {
  const ref = sessionStorage.getItem("roomRef");
  const response = await axios.get("user", {
    params: {
      ref
    }
  });

  return response.data;
}

async function takeRoom() {
  try {
    const r = sessionStorage.getItem("roomRef");
    const response = await axios.get("room", {
      params: {
        r
      }
    });

    return response.data;
  } catch (e) {
    return e.response.data;
  }
}

export {
  authenticate,
  registration,
  logout,
  recover,
  createRoom,
  takeRandRoom,
  takeAmountUsersRoom,
  takeRoom,
  defRoleTeam,
  getUserInfo
};