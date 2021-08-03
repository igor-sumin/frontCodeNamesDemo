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
              :disabled="!isQntRooms"
              type="button"
              :class="{
                'bg-indigo-500 focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer': isQntRooms,
                'bg-indigo-300 cursor-not-allowed': !isQntRooms,
              }"
              class="flex flex-col w-full py-3 mb-4 text-white rounded-md"
            >
              <p class="m-auto">Перейти в случайную комнату</p>
              <span class="m-auto">Создано комнат: {{ qntRooms }}</span>
            </button>

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
import { createRoom, takeRandRoom, takeAmountUsersRoom } from "../../api";
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
      timer: "",
      qntRooms: 0,
    };
  },

  methods: {
    async newRoom() {
      this.error = await createRoom();
      console.log("ref = " + sessionStorage.getItem("roomRef"));
    },

    async randRoom() {
      this.error = await takeRandRoom();
      console.log("ref = " + sessionStorage.getItem("roomRef"));
    },

    async defQntRooms() {
      this.qntRooms = await takeAmountUsersRoom();
    },

    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
  },

  async mounted() {
    this.defQntRooms();
    this.timer = setInterval(this.defQntRooms, 5000);
  },

  computed: {
    isQntRooms() {
      return this.qntRooms;
    },
  },

  beforeDestroy() {
    this.cancelAutoUpdate();
  },
};
</script>
