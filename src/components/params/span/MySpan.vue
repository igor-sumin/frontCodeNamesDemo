<template>
  <span v-if="team.captain && team.players">
    капитан и {{ team.players }} игрок
    <my-inner-span :players="team.players" />
  </span>
  <span v-else-if="team.captain">капитан</span>
  <span v-else-if="team.players">
    {{ team.players }} игрок
    <my-inner-span :players="team.players" />
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