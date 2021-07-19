<template>
  <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto my-10">
        <div class="text-center">
          <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">CodeNames Demo</h1>
          <p class="text-gray-500 dark:text-gray-400">Восстановление аккаунта</p>
        </div>
        <div class="m-7">
          <form @submit.prevent="userRecover">
            <div class="mb-6">
              <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Почта</label>
              <input
                v-model="email"
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
                class="w-full px-3 py-4 text-white rounded-md bg-indigo-500 focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >Восстановить</button>
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
import { recover } from "../../api";

export default {
  name: "Forgot",

  data() {
    return {
      email: "",
    };
  },

  methods: {
    userRecover() {
      recover(this.email);
    },
  },
};
</script>
