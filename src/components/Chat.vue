<template>
  <div class="flex flex-col h-full overflow-x-auto mb-4" ref="messagesContainer">
    <div class="flex flex-col h-full">
      <div class="grid grid-cols-12 gap-y-2">
        <div
          v-for="message in messages"
          :key="message.info.createdOn"
          :class="[
          message.userName === userMyName() ? 'col-start-6 col-end-13' : 'col-start-1 col-end-8'
        ]"
          class="p-3 rounded-lg"
        >
          <div
            :class="[
            message.userName === userMyName() ? 'justify-start flex-row-reverse' : 'flex-row'
          ]"
            class="flex items-center"
          >
            <div
              :class="{
                'border-indigo-400 border-2 bg-indigo-300 ': message.teamName !== 'Red' && message.captain,
                'border-yellow-400 border-2 bg-red-300': message.teamName === 'Red' && message.captain,
                'bg-indigo-300': message.teamName !== 'Red' && !message.captain,
                'bg-red-300': message.teamName === 'Red' && !message.captain,
              }"
              class="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
            >{{ String(message.userName).charAt(0) }}</div>
            <div
              :class="[
                message.teamName === 'Red' ? 'bg-red-100' : 'bg-indigo-100',
                message.userName === userMyName() ? 'mr-3' : 'ml-3'
              ]"
              class="relative px-2 shadow rounded-xl"
            >
              <div class="w-full flex justify-end">
                <span class="text-sm m-2">{{ message.info.userText }}</span>
                <span class="text-xs mt-4 text-gray-500">{{ timeMessage(message.info.createdOn) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="flex-grow ml-4 absolute w-9/12 bottom-6 right-32">
        <div class="relative w-full">
          <input
            v-model="messageToSend"
            @keyup.enter="sendMessage"
            placeholder="Введите сообщение"
            type="text"
            class="flex w-full rounded-xl focus:outline-none pl-4 h-10"
          />
        </div>
      </div>
      <div class="ml-4 absolute right-16 bottom-6">
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
</template>

<script>
import {
  sendMessages,
  getChatAllHistoryMessages,
  connect,
  getChatTeamHistoryMessages,
} from "../api";
export default {
  name: "Chat",

  props: {
    user: Object,
    selectedHistory: String,
  },

  data() {
    return {
      messages: [],
      messageToSend: "",
      messageToCome: "",
    };
  },

  methods: {
    timeMessage(t) {
      let time = new Date(t);
      return time.toTimeString().split(" ")[0].substring(0, 5);
    },

    sendMessage() {
      sendMessages(this.messageToSend);
      this.messageToSend = "";
    },

    scrollToEnd() {
      var content = this.$refs.messagesContainer;
      content.scrollTop = content.scrollHeight;
    },

    userMyName() {
      return this.user.info.userName;
    },

    async getAllHistory() {
      let messagesHistory = await getChatAllHistoryMessages();
      this.messages.push(...messagesHistory);
    },

    async getTeamHistory() {
      let messagesTeamHistor = await getChatTeamHistoryMessages();
      this.messages.push(...messagesTeamHistor);
    },
  },

  computed: {
    userBackground() {
      return this.user !== undefined && this.user.team === "Red";
    },

    isMessage() {
      return this.messageToSend;
    },
  },

  async mounted() {
    connect((msg) => {
      // this.messageToCome = JSON.parse(msg.body);
      this.messages.push(JSON.parse(msg.body));
    });

    this.getAllHistory();
  },

  updated() {
    this.$nextTick(() => this.scrollToEnd());
  },

  watch: {
    selectedHistory(v) {
      this.messages = [];
      if (v === "вся история") {
        this.getAllHistory();
      } else if (v === "история команды") {
        this.getTeamHistory();
      } else {
        console.log("error");
      }
    },
  },
};
</script>