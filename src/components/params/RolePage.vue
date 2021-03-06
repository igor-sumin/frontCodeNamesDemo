<template>
  <div class="flex items-center mt-60 bg-white dark:bg-gray-900">
    <div class="container mx-auto">
      <div class="max-w-md mx-auto">
        <div class="text-center">
          <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">CodeNames Demo</h1>
          <p class="text-gray-500 dark:text-gray-400">Выбери себе роль и команду</p>
        </div>
        <error v-if="error" :error="error" />
        <div class="pt-8">
          <form @submit.prevent="userRoleTeam" class="grid grid-cols-2 gap-2 w-full">
            <div>
              <input v-model="form.role" type="radio" id="captain" value="Captain" class="hidden" />
              <label
                class="flex flex-col p-4 border-2 border-gray-200 cursor-pointer"
                for="captain"
              >
                <span class="font-bold">Капитан</span>
              </label>
            </div>
            <div>
              <input type="radio" id="player" value="Player" class="hidden" v-model="form.role" />
              <label class="flex flex-col p-4 border-2 border-gray-200 cursor-pointer" for="player">
                <span class="font-bold">Игрок</span>
              </label>
            </div>
            <div>
              <input type="radio" id="red" value="Red" class="hidden" v-model="form.team" />
              <label class="flex flex-col p-4 border-2 border-gray-200 cursor-pointer" for="red">
                <span class="text-xl font-bold uppercase text-red-500">Красные</span>
                <span class="text-xs font-semibold mt-3 text-gray-500">
                  внутри
                  <my-span :team="teams.red" />
                </span>
              </label>
            </div>
            <div>
              <input type="radio" id="blue" value="Blue" class="hidden" v-model="form.team" />
              <label class="flex flex-col p-4 border-2 border-gray-200 cursor-pointer" for="blue">
                <span class="text-xl font-bold uppercase text-blue-500">Синие</span>
                <span class="text-xs font-semibold mt-3 text-gray-500">
                  внутри
                  <my-span :team="teams.blue" />
                </span>
              </label>
            </div>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="w-full px-3 py-3 mt-6 col-span-2 text-white rounded-md bg-indigo-500 focus:bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >Далее</button>
            <p class="mt-3 col-span-2 text-sm text-center text-gray-400">
              Хотите поменять комнату?
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
import { defRoleTeam, getUserInfo, takeRoom } from "../../api";
import Error from "../Error.vue";
import MySpan from "./span/MySpan.vue";

export default {
  name: "RolePage",

  components: {
    Error,
    MySpan,
  },

  data() {
    return {
      form: {
        role: "",
        team: "",
      },

      teams: {
        red: {
          captain: false,
          players: [],
        },
        blue: {
          captain: false,
          players: [],
        },
      },

      error: "",
      time: 3000,
    };
  },

  methods: {
    async userRoleTeam() {
      const checked = this.form;
      let json = {
        isCaptain: checked.role.startsWith("C"),
        teamName: checked.team,
      };

      this.error = await defRoleTeam(json);
    },

    async getInfoRoom() {
      let json = await takeRoom();
      let [blue, red] = this.defTeams(json);

      this.defTeam(this.teams.blue, blue);
      this.defTeam(this.teams.red, red);
    },

    defTeams(json) {
      if (JSON.stringify(json.teams) == "[]") {
        return;
      }

      let [blue, red] = [null, null];
      if (!!json.teams[1]) {
        [blue, red] =
          json.teams[0].teamName === "Blue" ? json.teams : json.teams.reverse();
      } else {
        let team = json.teams[0];

        if (team.teamName === "Blue") {
          blue = team;
        } else {
          red = team;
        }
      }

      return [blue, red];
    },

    defTeam(team, teamColor) {
      if (teamColor !== null && JSON.stringify(teamColor.users) != "[]") {
        Object.values(teamColor.users).forEach((value) => {
          if (!team.players.includes(value.userName)) {
            if (value.captain) {
              team.captain = value.captain;
            } else {
              team.players.push(value.userName);
            }
          }
        });
      }
    },

    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
  },

  mounted() {
    this.getInfoRoom();
    this.timer = setInterval(this.getInfoRoom, this.time);
  },

  computed: {
    hasCaptain() {
      return (this.teams.red.captain && this.teams.blue.captain) ||
        this.form.team === "Blue"
        ? this.teams.blue.captain
        : this.teams.red.captain;
    },

    isFormValid() {
      return this.form.role && this.form.team;
    },
  },

  beforeDestroy() {
    this.cancelAutoUpdate();
  },
};
</script>

<style scoped>
input:checked + label {
  border-color: black;
}
</style>