<template>
  <h2>CodeNamesDemo</h2>
  <h3>Авторизация</h3>
  <form class="login" @submit.prevent="onLogin">
    <input required v-model="login" type="text" placeholder="Логин" />
    <hr />
    <input required v-model="password" type="password" placeholder="Пароль" />
    <hr />
    <button type="submit" class="btn btn-block btn-login">Вперед</button>
  </form>
</template>

<script>
export default {
  name: "LoginPage",

  data() {
    return {
      login: "",
      password: "",
      token: "",
    };
  },

  methods: {
    async onLogin() {
      const form = {
        login: this.login,
        password: this.password,
      };

      const f = await fetch("localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ form }),
      });

      const data = await f.json();
      console.log(data);

      try {
        this.token = JSON.parse(localStorage.getItem("token:"));
        console.log(this.token);
      } catch {
        console.log("failed token");
      }
    },
  },

  // client js module TODO: (js-модули)
  // api js -> методы, которые запрашиваешь из сервера клиент- к серверу (вызовы) захватываем токен
};
</script>

<style src="./style.css"></style>
