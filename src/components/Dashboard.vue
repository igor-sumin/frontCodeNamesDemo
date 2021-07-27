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
        <div
          :class="[
            userBackground ? 'bg-red-200' : 'bg-indigo-200'
          ]"
          class="flex flex-col border items-center mt-4 w-full py-6 px-4 rounded-lg"
        >
          <div
            :class="{
              'border-yellow-300 border-2 text-yellow-200': !userBackground && this.user.info.captain,
              'border-yellow-500 border-2 text-yellow-500': userBackground && this.user.info.captain,
              'font-bold border-2 border-indigo-300 text-indigo-400': !userBackground && !this.user.info.captain,
              'font-bold border-2 border-red-300 text-red-400': userBackground && !this.user.info.captain,
            }"
            class="h-10 w-20 text-center pt-2 rounded-full overflow-hidden justify-center"
          >{{ this.user.info.userName }}</div>
          <div class="text-sm font-semibold mt-2">{{ this.user.info.userName }}</div>
          <div class="text-xs text-gray-500">
            <p v-if="this.user.info.captain">captain</p>
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
                    teams.red.captain === player ? 'border-2 border-yellow-500 shadow-inner' : ''
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
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-12 gap-y-2">
                <!-- чужие сообщения -->
                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >A</div>
                    <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>Hey How are you today?</div>
                    </div>
                  </div>
                </div>
                <!-- свои сообщения -->
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div
                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >A</div>
                    <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                      <div>I'm ok what about you? {{ message }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div class="flex-grow ml-4">
              <div class="relative w-full">
                <input
                  v-model="message"
                  type="text"
                  class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
              </div>
            </div>
            <div class="ml-4">
              <button
                @click.prevent="sendMessage"
                :disabled="!isMessage"
                :class="[
                  isMessage ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-300'
                ]"
                class="flex items-center justify-center rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span class="ml-2">
                  <svg
                    class="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
  getChatMessages,
} from "../api";

export default {
  name: "Dashboard",
  components: {
    Error,
  },

  data() {
    return {
      message: "",
      chatMessages: {
        user: {
          info: {},
          team: "",
        },
      },

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
    };
  },

  methods: {
    userLogout() {
      logout();
    },

    async userInfo() {
      console.log("user = " + JSON.stringify(this.user));
    },

    sendMessage() {
      sendMessages(this.message);
      this.message = "";
    },
  },

  async mounted() {
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

    console.log("blue = " + JSON.stringify(this.teams.blue));
    console.log("red = " + JSON.stringify(this.teams.red));

    // chatMessages: {
    //   user: {
    //     info: {},
    //     team: "",
    //   },
    // },
    let messages = await getChatMessages();
    // console.log("messages = " + JSON.stringify(messages));
  },

  created() {},

  computed: {
    isMessage() {
      return this.message;
    },

    userBackground() {
      return this.user.team == "Red" ? true : false;
    },
  },
};
</script>
