<template>
  <div class="flex flex-col h-full overflow-x-auto mb-4">
    <div class="flex flex-col h-full">
      <div v-for="message in messages" :key="message.createdOn" class="grid grid-cols-12 gap-y-2">
        :class="[
        message.userName === userMyName ? 'col-start-6 col-end-13' : 'col-start-1 col-end-8'
        ]"
        class="p-3 rounded-lg"
        >
        <div
          :class="[
            message.userName === userMyName ? 'justify-start flex-row-reverse' : 'flex-row'
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
            message.userName === userMyName ? 'mr-3' : 'ml-3'
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
</template>

<script>
export default {
  name: "Chat",
  props: ["messages"],
};
</script>