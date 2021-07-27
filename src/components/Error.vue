<template>
  <div class="mt-5 text-center px-3 py-2 rounded-md bg-red-200">
    <p class="text-red-600 dark:text-gray-400">Ошибка: {{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: ["error"],
};
</script>