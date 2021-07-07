// client js module TODO: (js-модули)
// api js -> методы, которые запрашиваешь из сервера клиент- к серверу (вызовы) захватываем токен

import axios from "axios";

function login(form) {
  console.log("hihihi");

  axios({
    method: "post",
    url: "http://localhost:8080/login",
    data: { form },
  });
}

export { login };

// try {
//   this.token = JSON.parse(localStorage.getItem("token:"));
//   console.log(this.token);
// } catch {
//   console.log("failed token");
// }
