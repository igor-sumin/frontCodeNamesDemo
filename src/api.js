import axios from "axios";

// axios Interceptors
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.token = token ? token : "";

  return config;
});

function authenticate(form) {
  console.log("login");

  axios.post("http://localhost:8080/login", form)
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function registration(form) {
  console.log("registration");

  axios.post("http://localhost:8080/register", form)
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export {
  authenticate,
  registration
};