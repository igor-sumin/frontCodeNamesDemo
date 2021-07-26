import axios from "axios";
import router from "./router";
import "./axios";

// --- Entry ---

export const authenticate = async (form) => {
  try {
    const response = await axios.post("login", form);
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common["token"] = localStorage.getItem("token");

    router.push("/room");
  } catch (e) {
    return e.response.data;
  }
};

export const registration = async (form) => {
  try {
    const response = await axios.post("register", form);
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common["token"] = localStorage.getItem("token");

    router.push("/login");
  } catch (e) {
    return e.response.data;
  }
};

// --- Params ---

export const createRoom = async () => {
  try {
    const response = await axios.post("room", {});
    sessionStorage.setItem("roomRef", response.data.roomRef);
    axios.defaults.headers.common["roomRef"] = sessionStorage.getItem("roomRef");

    router.push("/role");
  } catch (e) {
    return e.response.data;
  }
};

export const takeRandRoom = async () => {
  try {
    const response = await axios.get("room/random");
    sessionStorage.setItem("roomRef", response.data.roomRef);
    axios.defaults.headers.common["roomRef"] = sessionStorage.getItem("roomRef");

    router.push("/role");
  } catch (e) {
    return e.response.data;
  }
};

export const takeAmountUsersRoom = async () => {
  const response = await axios.get("room/qnt");
  return response.data;
};

// --- Roles ---

export const defRoleTeam = async (json) => {
  try {
    json.roomRef = sessionStorage.getItem("roomRef");
    const response = await axios.post("user", json);

    router.push({
      path: `/room/${json.roomRef}`
    });

  } catch (e) {
    return e.response.data;
  }
};

// --- Dashboard ---

export const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

export const getUserInfo = async () => {
  const ref = sessionStorage.getItem("roomRef");
  const response = await axios.get(`/user/${ref}`);

  return response.data;
}

export const takeRoom = async () => {
  try {
    const ref = sessionStorage.getItem("roomRef");
    const response = await axios.get(`/room/${ref}`);

    return response.data;

  } catch (e) {
    return e.response.data;
  }
}

var stompClient = null;
const connect = () => {
  const Stomp = require("stompjs");
  var SockJS = require("sockjs-client");
  let socket = new SockJS("http://localhost:8085/ws");

  const roomRef = sessionStorage.getItem("roomRef");
  stompClient = Stomp.over(socket);

  var headers = {
    roomRef: sessionStorage.getItem("roomRef")
  };

  // stompClient.connect({}, onConnected, onError);
  stompClient.connect({}, frame => {
    console.log('Connected: ' + frame)
    stompClient.subscribe("/user/messages", () => {}, headers);
  })
};

export const sendMessages = (content) => {
  const message = {
    roomRef: sessionStorage.getItem("roomRef"),
    userToken: localStorage.getItem("token"),
    userText: content,
    createdOn: new Date(),
  };


  stompClient.send("/app/chat", {
    token: localStorage.getItem("token")
  }, JSON.stringify(message));
};

export const getChatMessages = async () => {
  const roomRef = sessionStorage.getItem("roomRef");
  const response = await axios.get(`/messages/${roomRef}`);

  return response.data;
};

connect();