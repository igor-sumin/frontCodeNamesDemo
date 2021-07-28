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
          <div class="ml-2 font-bold text-2xl">Chat CodeNames</div>
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
              class="text-center mt-3 flex flex-col h-6 w-20 rounded-full text-white"
            >выйти</a>
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
          <div class="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            <div v-for="(player, idx) in teams.red.players" :key="idx">
              <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
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
          <div class="flex flex-col space-y-1 mt-4 -mx-2 h-50 overflow-y-auto">
            <div v-for="(player, idx) in teams.blue.players" :key="'A' + idx">
              <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
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
        </div>
      </div>
      <div class="flex flex-col flex-auto h-full p-6">
        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div class="flex flex-col h-full overflow-x-auto mb-4">
            <!-- Чат -->
            <div class="flex flex-col h-full">
              <chat :messages="messages" />
            </div>
          </div>
          <!-- Поле ввода -->
          <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div class="flex-grow ml-4">
              <div class="relative w-full">
                <input
                  v-model="message"
                  @keyup.enter="sendMessage"
                  placeholder="Введите сообщение"
                  type="text"
                  class="flex w-full rounded-xl focus:outline-none pl-4 h-10"
                />
              </div>
            </div>
            <div class="ml-4">
              <button
                @click.prevent="sendMessage"
                :disabled="!isMessage"
                :class="{
                  'bg-indigo-300': !userBackground && !isMessage,
                  'bg-red-300': userBackground && !isMessage,
                  'bg-indigo-500 hover:bg-indigo-600': !userBackground && isMessage,
                  'bg-red-500 hover:bg-red-600': userBackground && isMessage,
                }"
                class="flex items-center justify-center rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>
                  <svg
                    class="w-5 h-8 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  logout,
  getUserInfo,
  takeRoom,
  sendMessages,
  getChatHistoryMessages,
  getFullUserInfo,
  connect,
} from "../api";

import Error from "./Error.vue";
import Chat from "./Chat.vue";

export default {
  name: "Dashboard",
  components: {
    Error,
    Chat,
  },

  data() {
    return {
      message: "",
      messageHistory: [],
      messages: [],

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

      error: "",
    };
  },

  methods: {
    userLogout() {
      logout();
    },

    async userInfo() {
      let info = await getFullUserInfo();
      alert(JSON.stringify(info));
    },

    sendMessage() {
      sendMessages(this.message);
      this.message = "";
    },

    timeMessage(t) {
      let time = new Date(t);
      return time.toTimeString().split(" ")[0].substring(0, 5);
    },
  },

  async mounted() {
    connect((msg) => {
      this.messages.push(JSON.parse(msg.body));
    });

    // ---

    this.user.info = await getUserInfo();
    let json = await takeRoom();

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

  async created() {
    this.messageHistory = JSON.stringify(await getChatHistoryMessages());
  },

  computed: {
    isMessage() {
      return this.message;
    },

    userBackground() {
      return this.user.team === "Red" ? true : false;
    },

    userCaptain() {
      return this.user.info.captain;
    },

    userLetter() {
      return String(this.user.info.userName).charAt(0);
    },

    userMyName() {
      return this.user.info.userName;
    },
  },
};
</script>