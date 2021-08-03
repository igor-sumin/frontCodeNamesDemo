<template>
  <span v-if="team.captain && team.players.length">
    капитан и {{ team.players.length }} игрок
    <my-inner-span :players="team.players.length" />
  </span>
  <span v-else-if="team.captain">капитан</span>
  <span v-else-if="team.players.length">
    {{ team.players.length }} игрок
    <my-inner-span :players="team.players.length" />
  </span>
  <span v-else>никого</span>
</template>

<script>
import MyInnerSpan from "./MyInnerSpan.vue";

export default {
  name: "MySpan",
  components: {
    MyInnerSpan,
  },

  props: ["team"],
};
</script>