<template>
  <!-- TODO: vue-router -->
  <login></login>
</template>

<script>
import Login from "./components/entry/login/LoginPage.vue";
import Register from "./components/entry/registry/RegisterPage.vue";

export default {
  name: "App",
  components: {
    Login,
    Register,
  },
};
</script>
