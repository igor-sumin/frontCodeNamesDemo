<template v-if="seen">
  <div>
    <p>Hi</p>
  </div>
</template>

<script>
export default {
  name: "RegistryPage",
  data() {
    return {
      seen: true,
    }
  }
}
</script>
