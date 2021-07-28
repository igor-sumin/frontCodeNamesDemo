import axios from "axios";
import router from "./router";
import "./axios";

var client = null;

function getRoomRef() {
  let ref = sessionStorage.getItem("roomRef");
  if (ref === null) {
    ref = window.location.pathname.split("/").pop()
  }

  return ref
}

function setToken(response) {
  sessionStorage.setItem("token", response.data.token);
  axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
}

function setRoomRef(response) {
  sessionStorage.setItem("roomRef", response.data.roomRef);
  axios.defaults.headers.common["roomRef"] = sessionStorage.getItem("roomRef");
}

// --- Entry ---

export const authenticate = async (form) => {
  try {
    const response = await axios.post("login", form);
    setToken(response);

    router.push("/room");
  } catch (e) {
    return e.response.data;
  }
};

export const registration = async (form) => {
  try {
    const response = await axios.post("register", form);
    setToken(response);

    router.push("/room");
  } catch (e) {
    return e.response.data;
  }
};

// --- Params ---

export const createRoom = async () => {
  try {
    const response = await axios.post("room", {});
    setRoomRef(response);

    router.push("/role");
  } catch (e) {
    return e.response.data;
  }
};

export const takeRandRoom = async () => {
  try {
    const response = await axios.get("room/random");
    setRoomRef(response);

    router.push("/role");
  } catch (e) {
    return e.response.data;
  }
};

export const takeAmountUsersRoom = async () => {
  const response = await axios.get("room/amount/user");
  return response.data;
};

// --- Roles ---

export const defRoleTeam = async (json) => {
  try {
    json.roomRef = getRoomRef();
    const response = await axios.post("user", json);

    router.push({
      path: `/room/${json.roomRef}`
    });

  } catch (e) {
    return e.response.data;
  }
};

// --- Dashboard ---

export const logout = async () => {
  const response = await axios.patch(`/user/logout`);
  sessionStorage.removeItem("token");
  router.push("/login");
};

export const getUserInfo = async () => {
  const ref = getRoomRef();
  const response = await axios.get(`/user/${ref}`);

  return response.data;
}

export const getFullUserInfo = async () => {
  const response = await axios.get("/user");
  return response.data;
}

export const takeRoom = async () => {
  try {
    const ref = getRoomRef();
    const response = await axios.get(`/room/${ref}`);

    return response.data;

  } catch (e) {
    return e.response.data;
  }
}

export const connect = (cb) => {
  const Stomp = require("stompjs");
  var SockJS = require("sockjs-client");

  let socket = new SockJS("http://localhost:8085/ws");

  client = Stomp.over(socket);

  client.connect({}, () => {
    const ref = getRoomRef();
    client.subscribe(`/rooms/${ref}/messages`, cb);
  });
};

export const sendMessages = (content) => {
  const message = {
    userText: content,
    createdOn: new Date(),
  };

  client.send("/app/chat", {
    roomRef: getRoomRef(),
    token: sessionStorage.getItem("token")
  }, JSON.stringify(message));
};

export const getChatHistoryMessages = async () => {
  const ref = getRoomRef();
  const response = await axios.get(`/chat/${ref}/history`);

  return response.data;
};