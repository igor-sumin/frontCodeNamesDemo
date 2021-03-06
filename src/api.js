import axios from "axios";
import router from "./router";
import "./axios";

let client = null;
let socket = null;

function getRoomRef() {
  let ref_storage = sessionStorage.getItem("roomRef");
  let ref_path = window.location.pathname.split("/").pop();
  const path = [ref_storage, "login", "room", "registration"];

  if (ref_storage && path.includes(ref_storage)) {
    return ref_storage
  }

  return ref_path;
}

function setToken(response) {
  sessionStorage.setItem("token", response.data.token);
  axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
}

function setRoomRef(response) {
  sessionStorage.setItem("roomRef", response.data.roomRef);
  axios.defaults.headers.common["roomRef"] = sessionStorage.getItem("roomRef");
}

async function routeNext(response) {
  setToken(response);

  let room = await takeRoom();
  // существует ли комната
  if (!String(room).includes("not found room")) {
    let user = await getUserInfo();

    // есть ли у пользователя роль в комнате
    if (!String(user).includes("can't find")) {
      let ref = getRoomRef();

      router.push({
        path: `/room/${ref}`
      });
    } else {
      router.push("/role");
    }
  } else {
    router.push("/room");
  }
}

// --- Entry ---

export const authenticate = async (form) => {
  try {
    const response = await axios.post("login", form);
    routeNext(response);
  } catch (e) {
    return e.response.data;
  }
};

export const registration = async (form) => {
  try {
    const response = await axios.post("register", form);
    routeNext(response);
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
  sessionStorage.removeItem("roomRef");
  router.push("/login");
};

export const getUserInfo = () => {
  const ref = getRoomRef();
  return axios.get(`/user/${ref}`)
    .then(response => response.data)
    .catch(e => e.response.data);
}

export const getPlayerInfo = async (userName) => {
  const response = await axios.get(`/user/username/${userName}`);
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

export const defNewNameRoom = async (name) => {
  const ref = getRoomRef();
  await axios.patch(`room/${ref}`, {}, {
    params: {
      name: name
    }
  });
}

export const connect = (cb) => {
  const Stomp = require("stompjs");
  let SockJS = require("sockjs-client");
  socket = new SockJS("http://localhost:8085/ws");
  // socket = new SockJS("http://34.118.79.167:8085/ws");
  client = Stomp.over(socket);

  client.connect({}, () => {
    const ref = getRoomRef();
    client.subscribe(`/rooms/${ref}/messages`, cb);
  });
};

export const disconnect = () => {
  console.log("disconnect socket");
  socket.close();
}

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

export const getChatAllHistoryMessages = async () => {
  try {
    const ref = getRoomRef();
    const response = await axios.get(`/chat/${ref}/history/all`);

    return response.data;
  } catch (e) {
    console("err = " + e.response.data);
  }
};

export const getChatTeamHistoryMessages = async () => {
  try {
    const ref = getRoomRef();
    const response = await axios.get(`/chat/${ref}/history/team`);

    return response.data;
  } catch (e) {
    console("err = " + e.response.data);
  }
}