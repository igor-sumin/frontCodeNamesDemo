// client js module TODO: (js-модули)
// api js -> методы, которые запрашиваешь из сервера клиент- к серверу (вызовы) захватываем токен

import axios from "axios";

function loginUser(form, token) {
  console.log("login");

  // 1 var
  axios({
    method: "post",
    url: "http://localhost:8080/login",
    data: form,
  })

  // // 2 var
  // axios.post("http://localhost:8080/login", form).then((r) => {
  //   axios.defaults.headers.common["token"] = r.data.token;
  //   localStorage.setItem("token", JSON.stringify(r.token));
  // });

  // let token = JSON.parse(localStorage.getItem("token"));

  // // 3 var  
  // axios
  //   .post(
  //     "http://localhost:8080/login", {
  //       form,
  //     }, {
  //       headers: {
  //         token: token,
  //       },
  //     }
  //   )
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log("err: " + error);
  //   });
}

export {
  loginUser
};

// this.$http
//   .post("http://localhost:8080/login", form)
//   .then((response) => {
//     window.localStorage.setItem("token", response.data.token);
//     window.localStorage.setItem(
//       "auth-user",
//       JSON.stringify(response.data.user)
//     );

//     this.$route.router.go({ name: "example-component" });
//   })
//   .catch((errors) => {
//     console.log(errors);
//   });
// }

// try {
//   this.token = JSON.parse(localStorage.getItem("token:"));
//   console.log(this.token);
// } catch {
//   console.log("failed token");
// }