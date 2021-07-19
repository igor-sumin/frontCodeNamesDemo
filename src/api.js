import axios from "axios";
import router from "./router";

// --- Entry ---

async function authenticate(form) {
  try {
    const response = await axios.post("login", form);
    localStorage.setItem("token", response.data.token);

    router.push("/room");
  } catch (e) {
    return e.response.data;
  }
}

async function registration(form) {
  try {
    const response = await axios.post("register", form);
    localStorage.setItem("token", response.data.token);

    router.push("/login");
  } catch (e) {
    return e.response.data;
  }
}

// TODO: что с table:entry ?
function logout() {
  localStorage.removeItem("token");
  router.push("/login");
}

// TODO: доделать
async function recover(email) {
  const response = await axios.post("forgot", email);
  console.log(response.data);
}

// --- Params ---

async function createRoom() {
  try {
    const response = await axios.post("room");
    localStorage.setItem("ref", response.data.ref);
    router.push("/role");
  } catch (e) {
    return e.response.data;
  }
}

async function takeRandRoom() {
  try {
    const response = await axios.get("room");
    localStorage.setItem("ref", response.data.ref);
    router.push("/role");
  } catch (e) {
    return e.response.data;
  }
}

// --- Roles ---

async function defRoleTeam(fields) {
  try {
    const response = await axios.post("user", fields);
    console.log("my = " + response.data);
  } catch (e) {
    return e.response.data;
  }
}

// --- Dashboard ---
async function getUserInfo() {
  try {
    console.log("token = " + localStorage.getItem("token"));
    const response = await axios.get("user");

  } catch (e) {
    return e.response.data;
  }

  return response.data;
}

export {
  authenticate,
  registration,
  logout,
  recover,
  createRoom,
  takeRandRoom,
  defRoleTeam,
  getUserInfo
};