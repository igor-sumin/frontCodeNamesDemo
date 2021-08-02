<template>
  <div class="flex h-screen antialiased text-gray-800">
    <div class="flex flex-row w-full overflow-x-hidden">
      <div class="flex flex-col py-8 pl-6 pr-2 w-70 bg-white flex-shrink-0">
        <div class="flex flex-row items-center justify-center w-full">
          <div
            class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div class="ml-2">
            <button
              v-bind:title="String('задать новое имя команды')"
              @click.prevent="showRoomModal = true"
              class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div class="font-bold text-2xl">{{ room.name }}</div>
            </button>
            <info-modal
              :showing="showRoomModal"
              @close="showRoomModal = false; room.confirm = true"
            >
              <p class="w-full -pb-4 mb-2">Задайте новое имя комнате:</p>
              <input
                v-model="room.name"
                type="text"
                placeholder="введите название"
                class="w-full mb-8 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                @keyup.enter="showRoomModal = false; room.confirm = true"
              />
              <button
                :class="[
                userBackground ? 'bg-red-500 hover:bg-red-700' : 'bg-indigo-500 hover:bg-indigo-700'
              ]"
                class="text-white px-4 py-2 text-sm uppercase tracking-wide font-bold rounded-lg"
                @click="showRoomModal = false; room.confirm = true"
              >Подтвердить</button>
            </info-modal>
          </div>
        </div>
        <!-- О себе -->
        <div
          :class="[
            userBackground ? 'bg-red-200' : 'bg-indigo-200'
          ]"
          class="flex flex-col border items-center mt-4 w-full py-6 px-4 rounded-lg"
        >
          <div
            :class="{
              'border-yellow-300 border-2 text-yellow-200': !userBackground && userCaptain,
              'border-yellow-500 border-2 text-yellow-500': userBackground && userCaptain,
              'font-bold border-2 border-indigo-300 text-indigo-400': !userBackground && !userCaptain,
              'font-bold border-2 border-red-300 text-red-400': userBackground && !userCaptain,
            }"
            class="h-10 w-20 text-center pt-2 rounded-full overflow-hidden justify-center"
          >{{ userLetter }}</div>
          <div class="text-sm font-semibold mt-2">{{ this.user.info.userName }}</div>
          <div class="text-xs text-gray-500">
            <p v-if="userCaptain">captain</p>
            <p v-else>player</p>
          </div>
          <button
            @click.prevent="userInfo"
            type="button"
            :class="[
              userBackground ? 'bg-red-500 hover:bg-red-700' : 'bg-indigo-500 hover:bg-indigo-700'
            ]"
            class="pl-4 mt-3 flex flex-col h-6 w-20 rounded-full text-white"
          >о себе</button>
          <div class="flex flex-row items-center">
            <a
              @click="userLogout"
              :class="[
                userBackground ? 'bg-red-500 hover:bg-red-700' : 'bg-indigo-500 hover:bg-indigo-700'
              ]"
              class="text-center mt-3 flex flex-col h-6 w-20 rounded-full text-white cursor-pointer"
            >выйти</a>
          </div>
          <div class="flex flex-row items-center">
            <select
              v-model="selectedHistory"
              v-bind:title="'вывести историю беседы'"
              :class="[
                userBackground ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'
              ]"
              class="form-select w-full mt-3 pt-1 -mb-3 pr-4 text-center rounded-full cursor-pointer border-none text-white"
            >
              <option class="border-none">вся история</option>
              <option class="border-none">история команды</option>
            </select>
          </div>
        </div>
        <!-- Список команд -->
        <div class="flex flex-col mt-8">
          <div class="flex flex-row items-center justify-between text-base">
            <span class="font-bold">Команда красных</span>
            <span
              class="flex items-center justify-center bg-gray-300 h-5 w-5 rounded-full"
            >{{ teams.red.players.length + (this.user.team === "Red" ? 1 : 0)}}</span>
          </div>
          <div class="flex flex-col space-y-1 mt-4 -mx-2 h-44 overflow-y-auto">
            <div v-for="(player, idx) in teams.red.players" :key="idx">
              <button
                v-bind:title="String('информация о ' + player)"
                @click.prevent="playerInfo(player)"
                class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              >
                <div
                  :class="[
                    teams.red.captain === player ? 'border-2 border-yellow-400 shadow-inner' : ''
                  ]"
                  class="flex items-center justify-center h-8 w-8 bg-red-200 rounded-full"
                >{{ player[0] }}</div>
                <div class="ml-2 text-sm font-semibold">{{ player }}</div>
              </button>
            </div>
          </div>
          <div class="flex flex-row items-center justify-between text-base mt-6">
            <span class="font-bold">Команда синих</span>
            <span
              class="flex items-center justify-center bg-gray-300 h-5 w-5 rounded-full"
            >{{ teams.blue.players.length + (this.user.team === "Blue" ? 1 : 0)}}</span>
          </div>
          <div class="flex flex-col space-y-1 mt-4 -mx-2 h-44 overflow-y-auto">
            <div v-for="(player, idx) in teams.blue.players" :key="'A' + idx">
              <button
                v-bind:title="String('информация о ' + player)"
                @click.prevent="playerInfo(player)"
                class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              >
                <div
                  :class="[
                    teams.blue.captain === player ? 'border-2 border-indigo-400 shadow-inner' : ''
                  ]"
                  class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                >{{ player[0] }}</div>
                <div class="ml-2 text-sm font-semibold">{{ player }}</div>
              </button>
            </div>
          </div>
          <info-modal :showing="showUserModal" @close="showUserModal = false">
            <h2 class="text-xl font-bold text-gray-900">{{ tableInfo(infoUserModal)[0] }}</h2>
            <br />
            <p
              v-for="(userModal, idx) in tableInfo(infoUserModal).slice(1)"
              :key="'E' + idx"
              class="mb-6"
            >{{ userModal }}</p>
            <button
              :class="[
                userBackground ? 'bg-red-500 hover:bg-red-700' : 'bg-indigo-500 hover:bg-indigo-700'
              ]"
              class="text-white px-4 py-2 text-sm uppercase tracking-wide font-bold rounded-lg"
              @click="showUserModal = false"
              @keyup.enter="showUserModal = false"
            >Закрыть</button>
          </info-modal>
        </div>
      </div>
      <div class="flex flex-col flex-auto h-full p-6">
        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <chat v-bind:user="user" v-bind:selectedHistory="selectedHistory" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  logout,
  getUserInfo,
  getPlayerInfo,
  takeRoom,
  getFullUserInfo,
  defNewNameRoom,
} from "../api";

import Error from "./Error.vue";
import Chat from "./Chat.vue";
import InfoModal from "./InfoModal.vue";

export default {
  name: "Dashboard",
  components: {
    Error,
    Chat,
    InfoModal,
  },

  data() {
    return {
      teams: {
        red: {
          captain: "",
          players: [],
        },
        blue: {
          captain: "",
          players: [],
        },
      },

      user: {
        info: {},
        team: "",
      },

      room: {
        name: "",
        confirm: false,
      },
      showRoomModal: false,

      selectedHistory: "вся история",

      showUserModal: false,
      infoUserModal: [],

      error: "",
    };
  },

  methods: {
    userLogout() {
      logout();
    },

    async userInfo() {
      this.showUserModal = true;
      this.infoUserModal = await getFullUserInfo();
      this.infoUserModal.push(this.user.info.userName);
    },

    async playerInfo(playerName) {
      this.showUserModal = true;
      this.infoUserModal = await getPlayerInfo(playerName);
      this.infoUserModal.push(playerName);
    },

    tableInfo(info) {
      var res = [];
      res.push("Информация о пользователе " + info[info.length - 1] + ": ");
      Object.values(info).forEach((value) => {
        let role = value.captain ? "капитаном" : "игроком";
        let team = value.teamName === "Red" ? "красных" : "синих";
        let room = value.roomRef;

        if (room !== undefined) {
          res.push(
            "-в комнате ",
            room,
            " является ",
            role,
            " в команде ",
            team,
            "."
          );
        }
      });

      return res.join("").split("-");
    },
  },

  async mounted() {
    this.user.info = await getUserInfo();
    let json = await takeRoom();
    this.room.name = json.roomName;

    if (JSON.stringify(json.teams) == "[]") {
      return;
    }

    let [blue, red] = [null, null];
    if (json.teams[1] === undefined) {
      let team = json.teams[0];

      if (team.teamName === "Blue") {
        blue = team;
      } else {
        red = team;
      }
    } else {
      [blue, red] =
        json.teams[0].teamName === "Blue" ? json.teams : json.teams.reverse();
    }

    if (blue !== null && JSON.stringify(blue.users) != "[]") {
      Object.values(blue.users).forEach((value) => {
        if (value.captain) {
          this.teams.blue.captain = value.userName;
        }

        if (value.userName == this.user.info.userName) {
          this.user.team = "Blue";
        } else {
          this.teams.blue.players.push(value.userName);
        }
      });
    }

    if (red !== null && JSON.stringify(red.users) != "[]") {
      Object.values(red.users).forEach((value) => {
        if (value.captain) {
          this.teams.red.captain = value.userName;
        }

        if (value.userName == this.user.info.userName) {
          this.user.team = "Red";
        } else {
          this.teams.red.players.push(value.userName);
        }
      });
    }
  },

  computed: {
    userBackground() {
      return this.user.team === "Red";
    },

    userCaptain() {
      return this.user.info.captain;
    },

    userLetter() {
      return String(this.user.info.userName).charAt(0);
    },
  },

  watch: {
    room: {
      deep: true,
      async handler() {
        if (this.room.name.length > 20) {
          this.room.name = await takeNameRoom();
        }

        if (this.room.confirm) {
          await defNewNameRoom(this.room.name);
          this.room.confirm = false;
        }
      },
    },
  },
};
</script>
