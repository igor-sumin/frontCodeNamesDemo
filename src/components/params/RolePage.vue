<template>
  <div class="flex items-center mt-60 bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto">
        <div class="text-center">
          <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">CodeNames Demo</h1>
          <p class="text-gray-500 dark:text-gray-400">Выбери себе роль и команду</p>
        </div>
        <error v-if="error" :error="error" />
        <div class="m-8">
          <form class="grid grid-cols-2 gap-2 w-full max-w-screen-sm">
            <div>
              <input type="radio" id="captain" value="Captain" class="hidden" v-model="checkedRole" />
              <label
                class="flex flex-col p-4 border-2 border-gray-200 cursor-pointer"
                for="captain"
              >
                <span class="text-center font-bold">Капитан</span>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="player"
                value="Player"
                class="hidden"
                v-model="checkedRole"
                checked
              />
              <label class="flex flex-col p-4 border-2 border-gray-200 cursor-pointer" for="player">
                <span class="text-center font-bold">Игрок</span>
              </label>
            </div>
            <div>
              <input type="radio" id="red" value="Red" class="hidden" v-model="checkedTeam" />
              <label class="flex flex-col p-4 border-2 border-gray-200 cursor-pointer" for="red">
                <span class="text-xl font-bold uppercase text-red-500">Красные</span>
                <span class="text-xs font-semibold mt-3 text-gray-500">внутри 1 капитан, 3 игрока</span>
              </label>
            </div>
            <div>
              <input type="radio" id="blue" value="Blue" class="hidden" v-model="checkedTeam" />
              <label class="flex flex-col p-4 border-2 border-gray-200 cursor-pointer" for="blue">
                <span class="text-xl font-bold uppercase text-blue-500">Синие</span>
                <span class="text-xs font-semibold mt-3 text-gray-500">внутри 2 игрока</span>
              </label>
            </div>
            <button
              @click.prevent="userRoleTeam"
              type="button"
              class="w-full px-3 py-3 mt-6 col-span-2 text-white rounded-md bg-indigo-500 focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >Далее</button>
            <p class="mt-3 col-span-2 text-sm text-center text-gray-400">
              Хотите поменять комнату? {{ checkedRole }} + {{ checkedTeam }}
              <router-link
                to="/room"
                class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
              >Выбор комнаты</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defRoleTeam } from "../../api";
import Error from "../Error.vue";

export default {
  name: "RolePage",
  components: {
    Error,
  },

  data() {
    return {
      checkedRole: "",
      checkedTeam: "",
      error: "",
    };
  },

  methods: {
    async userRoleTeam() {
      const json = {
        isCaptain: this.checkedRole.startsWith("C"),
        teamName: this.checkedTeam,
      };

      this.error = await defRoleTeam(json);
    },
  },
};
</script>

<style scoped>
input:checked + label {
  border-color: black;
}
</style>