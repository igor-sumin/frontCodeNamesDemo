<template>
  <span class="-ml-1" v-if="players > 1 && players < 5">а</span>
  <span v-else-if="players === 1"></span>
  <span class="-ml-1" v-else>ов</span>
</template>

<script>
export default {
  name: "MyInnerSpan",
  props: ["players"],
};
</script>