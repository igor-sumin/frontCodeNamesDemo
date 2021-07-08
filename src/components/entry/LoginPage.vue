<template>
  <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto my-10">
        <div class="text-center">
          <h1
            class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200"
          >
            CodeNames Demo
          </h1>
          <p class="text-gray-500 dark:text-gray-400">
            Авторизируйтесь для входа в аккаунт
          </p>
        </div>
        <div class="m-7">
          <form action="">
            <div class="mb-6">
              <label
                for="text"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >Логин</label
              >
              <input
                v-model="login"
                type="text"
                placeholder="введите логин"
                class="
                  w-full
                  px-3
                  py-2
                  placeholder-gray-300
                  border border-gray-300
                  rounded-md
                  focus:outline-none
                  focus:ring focus:ring-indigo-100
                  focus:border-indigo-300
                  dark:bg-gray-700
                  dark:text-white
                  dark:placeholder-gray-500
                  dark:border-gray-600
                  dark:focus:ring-gray-900
                  dark:focus:border-gray-500
                "
                required
              />
            </div>
            <div class="mb-6">
              <div class="flex justify-between mb-2">
                <label
                  for="password"
                  class="text-sm text-gray-600 dark:text-gray-400"
                  >Пароль</label
                >
                <a
                  href="#!"
                  class="
                    text-sm text-gray-400
                    focus:outline-none
                    focus:text-indigo-500
                    hover:text-indigo-500
                    dark:hover:text-indigo-300
                  "
                  >Забыли пароль?</a
                >
              </div>
              <input
                v-model="password"
                type="password"
                placeholder="введите пароль"
                class="
                  w-full
                  px-3
                  py-2
                  placeholder-gray-300
                  border border-gray-300
                  rounded-md
                  focus:outline-none
                  focus:ring focus:ring-indigo-100
                  focus:border-indigo-300
                  dark:bg-gray-700
                  dark:text-white
                  dark:placeholder-gray-500
                  dark:border-gray-600
                  dark:focus:ring-gray-900
                  dark:focus:border-gray-500
                "
                required
              />
            </div>
            <div class="mb-6">
              <button
                @click.prevent="userLogin"
                :style="{
                  disabled: `${disableLoginButton}`
                }"
                class="
                  w-full
                  px-3
                  py-4
                  text-white
                  bg-indigo-500
                  rounded-md
                  focus:bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                "
              >
                Вперед
              </button>
            </div>
            <p class="text-sm text-center text-gray-400">
              Еще не имеете аккаунта?
              <a
                href="#!"
                class="
                  text-indigo-400
                  focus:outline-none
                  focus:underline
                  focus:text-indigo-500
                  dark:focus:border-indigo-800
                "
                >Зарегистрироваться</a
              >.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUser } from "../../api.js";

export default {
  name: "LoginPage",

  data() {
    return {
      login: "",
      password: "",
    };
  },

  methods: {
    async userLogin() {
      let form = {
        login: this.login,
        password: this.password,
      };

      console.log(form);

      loginUser(form, "11111");
    },

    getToken() {
      var rand = function () {
        return Math.random().toString(36).substr(2);
      };

      return rand() + rand();
    },
  },

  computed: {
    disableLoginButton() {
      return this.login !== "" || this.password !== "";
    }
  }
};
</script>
