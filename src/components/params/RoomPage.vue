<template>
  <div class="flex items-center min-h-screen bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto">
        <div class="text-center mb-12">
          <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">CodeNames Demo</h1>
          <p class="text-gray-500 dark:text-gray-400">Найди свою комнату</p>
        </div>
        <error v-if="error" :error="error" />
        <div class="m-7">
          <form action>
            <button
              @click.prevent="newRoom"
              type="button"
              class="w-full px-3 py-3 mb-4 text-white rounded-md bg-indigo-500 focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >Создать комнату</button>
            <button
              @click.prevent="randRoom"
              type="button"
              class="w-full px-3 py-3 mb-4 text-white rounded-md bg-indigo-500 focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >Перейти в случайную комнату</button>
            <p class="text-sm text-center text-gray-400">
              Хотите поменять аккаунт?
              <router-link
                to="/login"
                class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
              >Авторизация</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createRoom, takeRandRoom } from "../../api";
import Error from "../Error.vue";

export default {
  name: "RoomPage",
  components: {
    Error,
  },

  data() {
    return {
      ref: "",
      error: "",
    };
  },

  methods: {
    async newRoom() {
      this.error = await createRoom();
    },

    async randRoom() {
      this.error = await takeRandRoom();
    },
  },
};
</script>
