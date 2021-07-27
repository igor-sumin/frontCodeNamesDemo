<template>
  <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto my-10">
        <div class="text-center">
          <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">CodeNames Demo</h1>
          <p class="text-gray-500 dark:text-gray-400">Авторизируйтесь для входа в аккаунт</p>
        </div>
        <error v-if="error" :error="error" />
        <div class="m-7">
          <form @submit.prevent="userLogin">
            <div class="mb-6">
              <label for="text" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Логин</label>
              <input
                v-model="form.userLogin"
                type="text"
                placeholder="введите логин"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                required
              />
            </div>
            <div class="mb-6">
              <div class="flex justify-between mb-2">
                <label for="password" class="text-sm text-gray-600 dark:text-gray-400">Пароль</label>
              </div>
              <input
                v-model="form.userPassword"
                type="password"
                placeholder="введите пароль"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                required
              />
            </div>
            <div class="mb-6">
              <button
                type="submit"
                :disabled="!isFormValid"
                class="w-full px-3 py-4 text-white rounded-md bg-indigo-500 focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >Вперед</button>
            </div>
            <p class="text-sm text-center text-gray-400">
              Еще не имеете аккаунта?
              <router-link
                to="/registration"
                class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
              >Зарегистрироваться</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authenticate } from "../../api";
import Error from "../Error.vue";

export default {
  name: "LoginPage",
  components: {
    Error,
  },

  data() {
    return {
      form: {
        userLogin: "",
        userPassword: "",
      },
      error: "",
    };
  },

  methods: {
    async userLogin() {
      this.error = await authenticate(this.form);
    },
  },

  computed: {
    isFormValid() {
      return this.form;
    },
  },
};
</script>
