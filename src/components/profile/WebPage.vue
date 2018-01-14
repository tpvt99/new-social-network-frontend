<template>
  <div class="row">
    <div class="webpage1">
      <profile-main></profile-main>
    </div>
  </div>
</template>
<script>
import Main from './Main.vue'
export default {
  components: {
    profileMain: Main
  }
}
</script>
<style scoped>
.webpage1 {
  width: 100%;
  margin-top: 20px;
}
</style>
