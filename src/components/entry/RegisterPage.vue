<template>
  <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto my-10">
        <div class="text-center">
          <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">CodeNames Demo</h1>
          <p class="text-gray-500 dark:text-gray-400">Зарегистрируйте новый аккаунт</p>
        </div>
        <error v-if="error" :error="error" />
        <div class="m-7">
          <form @submit.prevent="userRegistration">
            <div class="mb-6">
              <label for="text" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Логин</label>
              <input
                v-model="form.login"
                type="text"
                placeholder="придумайте логин"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                required
              />
            </div>
            <div class="mb-6">
              <div class="flex justify-between mb-2">
                <label for="text" class="text-sm text-gray-600 dark:text-gray-400">Имя</label>
              </div>
              <input
                v-model="form.userName"
                type="text"
                placeholder="введите имя"
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
                placeholder="придумайте пароль"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                required
              />
            </div>
            <div class="mb-6">
              <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Почта</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="введите почту"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                required
              />
            </div>
            <div class="mb-6">
              <button
                type="submit"
                :disabled="!isFormValid"
                class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >Создать</button>
            </div>
            <p class="text-sm text-center text-gray-400">
              Уже есть аккаунт?
              <router-link
                to="/login"
                class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
              >Вход</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registration } from "../../api";
import Error from "../Error.vue";

export default {
  name: "RegisterPage",

  components: {
    Error,
  },

  data() {
    return {
      form: {
        login: "",
        userName: "",
        userPassword: "",
        email: "",
      },
      error: "",
    };
  },

  methods: {
    async userRegistration() {
      this.error = await registration(this.form);
    },
  },

  computed: {
    isFormValid() {
      return this.form;
    },
  },
};
</script>
